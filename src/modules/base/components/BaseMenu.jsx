import React from 'react';
import { action } from 'mobx';
import { inject } from 'mobx-react';
import { Link } from 'react-router';
import { MenuItem } from 'material-ui';

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
      const { module: { name }, id, resource } = this.props;
      const store = this.props[name];
      return store.remove(id, resource);
    }
  }

  render() {
    const { id, module: { metadata }, resource } = this.props;
    return (<div>
      <Link to={`/${resource || metadata.resource}/edit/${id}`}>{
        ({ onClick }) =>
          <MenuItem primaryText="Edit" onClick={onClick} />
      }</Link>
      <MenuItem primaryText="Remove" onClick={this.handleRemove} />
    </div>);
  }

}

export default BaseMenu;
