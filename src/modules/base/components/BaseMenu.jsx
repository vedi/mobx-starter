import React from 'react';
import { action } from 'mobx';
import { inject } from 'mobx-react';
import { Link } from 'react-router';
import { IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

@inject('ui')
class BaseMenu extends React.Component {

  static propertyTypes = {
    module: React.PropTypes.any,
  };

  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRemoveConfirmed = this.handleRemoveConfirmed.bind(this);
  }

  @action
  handleRemove() {
    const { ui, id, module: { metadata: { title } } } = this.props;
    ui.showConfirmationDialog('Confirm', `Do you want to remove ${title} #${id}`,
      this.handleRemoveConfirmed);
  }

  @action
  handleRemoveConfirmed(submit) {
    if (submit) {
      const { module: { name }, id } = this.props;
      const store = this.props[name];
      return store.remove(id);
    }
  }

  render() {
    const { id, module: { metadata: { resource } } } = this.props;
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Link to={`/${resource}/edit/${id}`}>{
          ({ onClick }) =>
            <MenuItem primaryText="Edit" onClick={onClick} />
        }</Link>
        <MenuItem primaryText="Remove" onClick={this.handleRemove} />
      </IconMenu>
    );
  }

}

export default BaseMenu;
