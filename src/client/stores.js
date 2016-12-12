import requestCreator from 'core/helpers/request'
import socketCreator from 'core/helpers/socket'
import Common from '../stores/common'

// All our actions are listed here
export const stores = (state = {}, token) => {

  const request = requestCreator(state.common.hostname, token);

  function getBasicAuth(clientId, clientSecret) {
    return btoa(`${clientId}:${clientSecret}`);
  }

  const socket = socketCreator(state.common.backend, {
    extraHeaders: {
      'Authorization': `Basic ${getBasicAuth(state.common.clientId, state.common.clientSecret)}`
    }
  });
  return {
    common: new Common(request, socket, state.common)
  }
};

// Initialize actions and state
export default process.env.BROWSER ? stores(window.__STATE) : {}
