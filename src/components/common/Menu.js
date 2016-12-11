import React from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router'

import {Drawer, MenuItem} from 'material-ui';

const loggedInMenuItems = [
  { route: '/', text: 'Browse' },
  { route: '/page/about', text: 'About' },
  { route: '/page/logout', text: 'Logout' },
];

const loggedOutMenuItems = [
  { route: '/', text: 'Browse' },
  { route: '/page/about', text: 'About' },
  { route: '/page/register', text: 'Register' },
  { route: '/page/login', text: 'Login' },
];


@inject('account') @observer
class Menu extends React.Component {

  render() {
    const {account} = this.props;
    return this.getDrawer(account.isLoggedIn());
  }

  onDrawerChange(e, key, payload) {
    // Do DOM Diff refresh
    this.context.router.transitionTo(payload.route);
  }

  getDrawer(loggedIn) {
    const items = loggedIn ? loggedInMenuItems : loggedOutMenuItems;

    return <Drawer
      open={true}
      onChange={this.onDrawerChange}
    >
      {items.map(loggedInMenuItem => this.getMenuItem(loggedInMenuItem))}
    </Drawer>
  }

  getMenuItem({route, text}) {
    return <Link key={text} to={route}>{
      ({isActive, location, href, onClick, transition}) =>
        <MenuItem onClick={onClick}>{text}</MenuItem>
    }</Link>
  }

}

export default Menu
