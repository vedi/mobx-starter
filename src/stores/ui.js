import { extendObservable, action } from 'mobx';

const menuItems = [
  { route: '/', text: 'Dashboard' },
  { route: '/users', text: 'Users' },
];

/**
 * @class Ui
 */
export default class Ui {

  constructor(state = {}) {
    extendObservable(this, {
      title: 'Admin',
      isConfirmationDialogOpen: false,
      confirmationDialogTitle: null,
      confirmationDialogMessage: null,
      isDrawerOpen: false,
      lastResult: null,
      menuItems,
    }, state);

    this.confirmationHandler = null;
  }

  @action
  toggleDrawer(open) {
    this.isDrawerOpen = ((open !== undefined) ? open : !this.isDrawerOpen);
  }

  @action
  showConfirmationDialog(confirmationDialogTitle, confirmationDialogMessage, confirmationHandler) {
    Object.assign(this, {
      confirmationDialogTitle,
      confirmationDialogMessage,
      confirmationHandler,
      isConfirmationDialogOpen: true,
    });
  }
}
