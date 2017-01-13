import Bb from 'bluebird';
import React from 'react';
import { observer, inject } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

import formPlugins from 'src/form-plugins';
import FormTextField from 'src/components/form/FormTextField';
import FormControls from 'src/components/form/FormControls';

import metadata from '../auth.metadata';

const form = new MobxReactForm({ fields: metadata.fields, plugins: formPlugins });

@inject('auth')
@inject('ui')
@observer
class LoginForm extends React.Component {

  static contextTypes = {
    router: React.PropTypes.any,
  };

  // When route is loaded (isomorphic)
  static onEnter({ ui }) {
    ui.title = 'Login';

    form.reset();
  }

  constructor() {
    super();
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentWillMount() {
    LoginForm.onEnter(this.props);
  }

  onSuccess(form) {
    const { auth } = this.props;
    const { router } = this.context;

    Bb
      .try(() => {
        const formValues = form.values();
        return auth.login(formValues);
      })
      .then(() => {
        router.transitionTo('/');
      })
      .catch((error) => {
        form.invalidate(error.message || error);
      });
  }

  onError(form) {
    form.invalidate('The form contains errors');
  }

  render() {
    return (
      <form>
        <FormTextField key="username" field={form.$('username')} />
        <FormTextField key="password" field={form.$('password')} type="password" />
        <FormControls
          form={form}
          submitOptions={{
            onSuccess: this.onSuccess,
            onError: this.onError,
          }}
        />
      </form>
    );
  }
}

export default LoginForm;
