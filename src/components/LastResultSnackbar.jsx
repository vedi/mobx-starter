

import React from 'react';
import { inject, observer } from 'mobx-react';

import { Snackbar } from 'material-ui';

@inject('ui')
@observer
class LastResultSnackbar extends React.Component {

  handleRequestClose = () => {
    const { ui } = this.props;

    ui.lastResult = null;
  };

  render() {
    const { ui: { lastResult } } = this.props;
    return (<Snackbar
      open={lastResult !== null}
      message={lastResult || ''}
      autoHideDuration={4000}
      onRequestClose={this.handleRequestClose}
    />);
  }

}

export default LastResultSnackbar;
