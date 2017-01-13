/**
 * Created by vedi on 12/01/2017.
 */

import { inject } from 'mobx-react';

import { baseModuleOptions } from '../base';
import UserStore from './user.store';
import userMetadata from './user.metadata';

const UserMenu = inject('user')(baseModuleOptions.Menu);
const UserList = Object.assign(
  inject('user')(baseModuleOptions.List), baseModuleOptions.List);
const UserForm = inject('user')(baseModuleOptions.Form);

const userModuleOptions = Object.assign({}, baseModuleOptions, {
  name: 'user',
  Menu: UserMenu,
  List: UserList,
  Form: UserForm,
  Store: UserStore,
  metadata: userMetadata,
});

export default userModuleOptions;
