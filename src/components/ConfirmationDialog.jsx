import React from 'react';
import { inject, observer } from 'mobx-react';

import { Dialog, FlatButton } from 'material-ui';

@inject('ui')
@observer
class ConfirmationDialog extends React.Component {

  handleCloseDialog(submit) {
    const { ui } = this.props;
    ui.isConfirmationDialogOpen = false;
    if (!ui.confirmationHandler) {
      console.log('No confirmationHandler');
      return;
    }
    ui.confirmationHandler(submit);
  }

  render() {
    const { ui } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.handleCloseDialog(false)}
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={() => this.handleCloseDialog(true)}
      />,
    ];

    return (<Dialog
      title={ui.confirmationDialogTitle}
      actions={actions}
      modal={false}
      open={ui.isConfirmationDialogOpen}
      onRequestClose={() => this.handleCloseDialog(false)}
    >
      {ui.confirmationDialogMessage}
    </Dialog>);
  }

}

export default ConfirmationDialog;
