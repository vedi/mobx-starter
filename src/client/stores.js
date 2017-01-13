import requestCreator from 'core/helpers/request';
import { AuthStore } from 'src/modules/auth';
import userModule from 'src/modules/user';
import Common from '../stores/common';
import Ui from '../stores/ui';

// All our actions are listed here
export const storesCreator = (state = {}, accessToken) => {
  function getBasicAuth(clientId, clientSecret) {
    return btoa(`${clientId}:${clientSecret}`);
  }

  const { common } = state;

  const basicAuthorization = `Basic ${getBasicAuth(common.clientId, common.clientSecret)}`;

  const request = requestCreator(state.common.backend, {
    basicAuthorization,
    accessToken,
  });

  const storages = {
    common: new Common(request, state.common),
    auth: new AuthStore(request, state.user),
    user: new userModule.Store(request, state.user),
    ui: new Ui(state.ui),
  };

  return storages;
};

// Initialize actions and state
export default process.env.BROWSER ? storesCreator(window.__STATE) : {};
