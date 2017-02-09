import React from 'react';
import { inject, observer } from 'mobx-react';
import { AppBar } from 'material-ui';

import TitleMenu from './TitleMenu';

@inject('ui')
@observer
class Title extends React.Component {

  constructor() {
    super();
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  getDropDown() {
    return <TitleMenu />;
  }

  handleToggleDrawer() {
    const { ui } = this.props;
    ui.toggleDrawer();
  }

  render() {
    const { ui } = this.props;
    return (<AppBar
      className={ui.searchOpen ? 'search-open' : ''}
      title={ui.title}
      iconElementRight={this.getDropDown()}
      onLeftIconButtonTouchTap={this.handleToggleDrawer}
    />);
  }
}

export default Title;
