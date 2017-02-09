import _ from 'lodash';
import Bb from 'bluebird';
import React from 'react';
import { observer, inject } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

import formPlugins from 'src/form-plugins';
import FormTextField from 'src/components/form/FormTextField';
import FormSelectField from 'src/components/form/FormSelectField';
import FormToggleField from 'src/components/form/FormToggleField';
import FormControls from 'src/components/form/FormControls';

import Loading from '../../../components/common/Loading';

@inject('ui')
@observer
class BaseForm extends React.Component {

  static propertyTypes = {
    module: React.PropTypes.any,
  };

  static contextTypes = {
    router: React.PropTypes.any,
  };

  // When route is loaded (isomorphic)
  static onEnter(props) {
    const { module, params: { id }, resource } = props;
    const { metadata, name } = module;
    const { [name]: store } = props;

    store.item = null;

    return store
      .init(resource || metadata.resource, module)
      .then(() => {
        // fetch data for edit
        if (id) {
          return store.fetchOne(id, resource || metadata.resource);
        } else {
          return Bb.resolve();
        }
      });
  }

  static buildFormOption(formMeta, schema) {
    return _.reduce(formMeta, (result, value, key) => {
      result.fields.push(key);
      if (value.placeholder) {
        result.placeholders[key] = value.placeholder;
      }
      return result;
    }, { fields: [], placeholders: {}, schema, plugins: formPlugins });
  }

  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentWillMount() {
    const { ui, module: { name, metadata }, params: { id }, [name]: store } = this.props;

    ui.title = `${!id ? 'Create' : 'Edit'} ${metadata.title}`;

    return BaseForm
      .onEnter(this.props)
      .then(() => {
        this.prepareForm(store);
      });
  }

  onSuccess(form) {
    const { params, module: { name, metadata }, [name]: store, resource } = this.props;
    const { router } = this.context;
    Bb
      .try(() => {
        const formValues = form.values();
        if (params.id) {
          return store.update(params.id, formValues, resource || metadata.resource);
        } else {
          return store.create(formValues, resource || metadata.resource);
        }
      })
      .then(() => {
        router.transitionTo(`/${resource || metadata.resource}`);
      })
      .catch((error) => {
        form.invalidate(error.message || error);
      });
  }

  onError(form) {
    form.invalidate('The form contains errors');
  }

  prepareForm(store) {
    const { schema, formMeta } = store;

    if (!this.form) {
      this.form = new MobxReactForm(BaseForm.buildFormOption(formMeta, schema));
      this.form.reset();
    }

    const { form } = this;
    if (store.item) {
      form.update(_.pick(store.item, form.fields.keys()));
    }
  }

  renderField(formMeta, fieldName) {
    const field = this.form.$(fieldName);
    const { [fieldName]: fieldExtra } = formMeta;
    const { component = 'text' } = fieldExtra;
    if (component === 'text') {
      return (<FormTextField
        key={fieldName}
        field={field}
        fieldExtra={fieldExtra}
      />);
    } else if (component === 'select') {
      return (<FormSelectField
        key={fieldName}
        field={field}
        dataSource={fieldExtra.selectDataSource}
      />);
    } else if (component === 'toggle') {
      return (<FormToggleField
        key={fieldName}
        field={field}
      />);
    } else {
      throw new Error(`Wrong component: ${component}`);
    }
  }

  render() {
    const { module: { name }, [name]: store } = this.props;
    const { formMeta } = store;

    if (!formMeta) {
      return (<div style={{ width: '100%', textAlign: 'center' }}>
        <Loading />
      </div>);
    }

    this.prepareForm(store);

    return (
      <form>
        {this.form.fields.keys().map(fieldName => (
          this.renderField(formMeta, fieldName)
        ))}
        <FormControls
          form={this.form}
          submitOptions={{
            onSuccess: this.onSuccess,
            onError: this.onError,
          }}
        />
      </form>
    );
  }
}

export default BaseForm;
