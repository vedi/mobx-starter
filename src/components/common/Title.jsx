import React from 'react';
import { inject, observer } from 'mobx-react';

import { AppBar } from 'material-ui';

@inject('ui')
@observer
class Title extends React.Component {

  constructor() {
    super();
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  getDropDown() {
    // TODO: It's a template to define menus for AppBar
    return /* <Match exactly pattern="/" component={ChargePointMenu}/>*/ null;
  }

  handleToggleDrawer() {
    const { ui } = this.props;
    ui.toggleDrawer();
  }

  render() {
    const { ui } = this.props;
    return (<AppBar
      title={ui.title}
      titleStyle={{ textAlign: 'center' }}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      iconElementRight={this.getDropDown()}
      onLeftIconButtonTouchTap={this.handleToggleDrawer}
    />);
  }
}

export default Title;
