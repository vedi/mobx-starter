/**
 * Created by vedi on 12/01/2017.
 */

import BaseMenu from './components/BaseMenu';
import BaseList from './pages/BaseList';
import BaseForm from './pages/BaseForm';
import BaseStore from './base.store';
import baseMetadata from './base.metadata';

const baseModuleOptions = {
  name: 'base',
  Menu: BaseMenu,
  List: BaseList,
  Form: BaseForm,
  Store: BaseStore,
  metadata: baseMetadata,
};

export { BaseList, BaseForm, BaseStore, baseModuleOptions };

export default baseModuleOptions;
