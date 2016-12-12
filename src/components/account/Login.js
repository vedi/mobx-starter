import React from 'react'
import {observer, inject} from 'mobx-react'
import {TextField, RaisedButton} from 'material-ui'

import Loading from '../common/Loading'
import Error from '../common/Error'

@inject('common') @inject('account') @observer
class Login extends React.Component {

  componentWillMount() {
    Login.onEnter(this.props);
  }

  // When route is loaded (isomorphic)
  static onEnter({common}) {
    common.title = 'Login'
  }

  static contextTypes = {
    router: React.PropTypes.any
  };

  state = {
    username: '',
    password: '',
    loading: false,
    error: null
  };

  handleChange = (key) => (e) => {
    this.setState({
      [key]: e.target.value
    })
  };

  handleLogin = (e) => {
    e.preventDefault();
    const {account} = this.props;
    const {router} = this.context;
    const {username, password} = this.state;

    account.login({username, password})
      .then(() => {
        this.setState({
          error: null,
          loading: true
        });
        setTimeout(() => router.transitionTo('/'), 500)
      })
      .catch(error => {
        this.setState({
          error,
          loading: false,
          password: ''
        })
      })
  };

  render() {
    const {loading, error} = this.state;

    if (loading) {
      return <Loading/>
    }

    return <main>
      <form onSubmit={(e) => this.handleLogin(e)}>
        <TextField
          name="username"
          floatingLabelText="Username"
          value={this.state.username}
          onChange={this.handleChange('username')}
          required="required"/>
        <br/>
        <TextField
          name="password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          required="required"/>
        <br/>

        {error && <Error text={error}/>}

        <RaisedButton label="Login" onClick={(e) => this.handleLogin(e)}/>
      </form>
    </main>
  }
}

export default Login
