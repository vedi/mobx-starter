import React from 'react'
import {observer, inject} from 'mobx-react'

import {AppBar} from 'material-ui';

@inject('common') @observer
class Menu extends React.Component {

  render() {
    const {common} = this.props;
    return <AppBar title={common.title} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
  }

}

export default Menu
