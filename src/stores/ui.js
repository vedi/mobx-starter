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
      title: 'Plaqless-Admin',
      isConfirmationDialogOpen: false,
      confirmationDialogTitle: null,
      confirmationDialogMessage: null,
      isDrawerOpen: false,
      showSearch: false,
      searchValue: '',
      searchOpen: false,
      lastResult: null,
      menuItems,
    }, state);

    this.confirmationHandler = null;
  }

  prepareSearch() {
    this.showSearch = true;
    this.searchValue = '';
    this.searchOpen = false;
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
