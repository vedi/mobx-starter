import _ from 'lodash';
import Bb from 'bluebird';
import React from 'react';
import { observer, inject } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

import formPlugins from 'src/form-plugins';
import FormTextField from 'src/components/form/FormTextField';
import FormControls from 'src/components/form/FormControls';

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
  static onEnter({ module: { name }, params: { id }, [name]: store }) {
    // fetch data for edit
    if (id) {
      return store.fetchOne(id);
    } else {
      return Bb.resolve();
    }
  }

  constructor({ module: { metadata: { fields } } }) {
    super();
    this.form = new MobxReactForm({ fields: this.getFields(fields), plugins: formPlugins });
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentWillMount() {
    const { ui, module: { metadata }, params: { id } } = this.props;
    const { form } = this;
    ui.title = `${!id ? 'Create' : 'Edit'} ${metadata.title}`;
    form.reset();

    return BaseForm
      .onEnter(this.props)
      .then((result) => {
        if (result) {
          form.update(_.pick(result, form.fields.keys()));
        }
      });
  }

  onSuccess(form) {
    const { params, module: { name, metadata }, [name]: store } = this.props;
    const { router } = this.context;
    Bb
      .try(() => {
        const formValues = form.values();
        if (params.id) {
          return store.update(params.id, formValues);
        } else {
          return store.create(formValues);
        }
      })
      .then(() => {
        router.transitionTo(`/${metadata.resource}`);
      })
      .catch((error) => {
        form.invalidate(error.message || error);
      });
  }

  onError(form) {
    form.invalidate('The form contains errors');
  }

  getFields(fields) {
    return _.reduce(fields, (result, value, key) => {
      if (value.showInForm) {
        result[key] = value;
      }
      return result;
    }, {});
  }

  render() {
    const { module: { metadata } } = this.props;
    return (
      <form>
        {this.form.fields.keys().map(fieldName => (
          <FormTextField
            key={fieldName}
            field={this.form.$(fieldName)}
            fieldExtra={metadata.fields[fieldName]}
          />
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
