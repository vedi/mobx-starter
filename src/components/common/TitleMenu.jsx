import Cookies from 'js-cookie';
import React from 'react';
import { inject, observer } from 'mobx-react';

import { IconMenu, IconButton, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SearchField from './SearchField';

@inject('ui')
@observer
class TitleMenu extends React.Component {

  static contextTypes = {
    router: React.PropTypes.any,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { router } = this.context;
    Cookies.remove('accessToken');
    router.transitionTo('/');
  }

  render() {
    const { ui } = this.props;
    return (
      <div>
        { ui.showSearch ? <SearchField onSearch="" /> : null }
        <IconMenu
          iconStyle={{ color: 'white' }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </IconMenu>
      </div>
    );
  }
}

export default TitleMenu;
