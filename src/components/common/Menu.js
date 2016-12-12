import React from 'react'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router'

import {Drawer, MenuItem} from 'material-ui';

const menuItems = [
  {route: '/', text: 'Browse'},
];


@observer
class Menu extends React.Component {

  render() {
    return this.getDrawer();
  }

  onDrawerChange(e, key, payload) {
    // Do DOM Diff refresh
    this.context.router.transitionTo(payload.route);
  }

  getDrawer() {
    return <Drawer open={true} onChange={this.onDrawerChange}>
      {menuItems.map(loggedInMenuItem => this.getMenuItem(loggedInMenuItem))}
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
