import React from 'react'
import {observer, inject} from 'mobx-react'
import Loading from '../common/Loading'

import {Card, CardActions, CardTitle, CardText, RaisedButton} from 'material-ui';

@inject('common') @inject('account') @observer
class Logout extends React.Component {

  componentWillMount() {
    Logout.onEnter(this.props);
  }

  // When route is loaded (isomorphic)
  static onEnter({common}) {
    common.title = 'Logout'
  }

  static contextTypes = {
    router: React.PropTypes.any
  };

  state = {
    loading: false
  };

  handleLogout = () => {
    const {account} = this.props;
    const {router} = this.context;

    account.logout().then(() => {
      this.setState({
        loading: true
      });
      setTimeout(() => router.transitionTo('/'), 500)
    })
  };

  render() {
    const {loading} = this.state;

    if (loading) {
      return <Loading/>
    }

    return <Card zDepth={0}>
      <CardTitle title="Do you want to log out?"/>
      <CardText>This will disconnect you and you will have to login again next time.</CardText>
      <CardActions>
        <RaisedButton label="Logout" primary={true} onClick={this.handleLogout}/>
      </CardActions>
    </Card>
  }
}

export default Logout
