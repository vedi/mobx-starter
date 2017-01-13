import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';

import { Drawer, MenuItem } from 'material-ui';

@inject('ui')
@observer
class Menu extends React.Component {

  onDrawerChange(e, key, payload) {
    // Do DOM Diff refresh
    this.context.router.transitionTo(payload.route);
  }

  getMenuItem({ route, text }) {
    return (<Link key={text} to={route}>{
      ({ onClick }) =>
        <MenuItem onClick={this.clickWrapper(onClick)}>{text}</MenuItem>
    }</Link>);
  }

  clickWrapper(next) {
    const { ui } = this.props;
    return (...params) => {
      ui.toggleDrawer(false);
      next(...params);
    };
  }

  render() {
    const { ui } = this.props;
    const { menuItems } = ui;
    return (
      <Drawer
        open={ui.isDrawerOpen}
        docked={false}
        onChange={this.onDrawerChange}
        onRequestChange={open => ui.toggleDrawer(open)}
      >
        {menuItems.map(loggedInMenuItem => this.getMenuItem(loggedInMenuItem))}
      </Drawer>
    );
  }
}

export default Menu;
