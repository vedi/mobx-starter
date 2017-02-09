import Cookies from 'js-cookie';

function trimLeft(str, replacement) {
  while (str.charAt(0) === replacement) {
    str = str.substr(1);
  }
  return str;
}

/**
 * Prepend host of API server
 * @param hostname
 * @param path
 * @returns {String}
 * @private
 */
function createURL(hostname, path) {
  if (process.env.BROWSER) {
    return `//${hostname}/${trimLeft(path, '/')}`;
  } else {
    return `http://${hostname}/${trimLeft(path, '/')}`;
  }
}

function getCookie(key) {
  return Cookies.get(key);
  // const cookieValue = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
  // return cookieValue ? cookieValue.pop() : '';
}

/**
 * This is our overly complicated isomorphic "request"
 * @param hostname
 * @param basicAuthorization
 * @param login
 * @param accessToken
 * @returns {Function}
 */
export default (hostname, { basicAuthorization, login = '/login', accessToken }) => {
  /**
   * Parse response
   * @param resp
   * @returns {Promise}
   * @private
   */
  function handleResponse(resp) {
    const redirect = resp.headers.get('Location');
    if (redirect) {
      if (process.env.BROWSER) {
        window.location.replace(redirect);
      }
      return Promise.resolve({ redirect });
    }

    const contentType = resp.headers && resp.headers.get('Content-Type');
    const isJSON = contentType && contentType.includes('json');
    const response = resp[isJSON ? 'json' : 'text']();

    return resp.ok ?
      response : response.then((err) => {
        if (resp.status === 401) {
          Cookies.remove('accessToken');
          if (process.env.BROWSER) {
            window.location.replace(login);
          }
          return Promise.resolve({ redirect: login });
        }
        if (process.env.DEV) {
          console.error('requestError:', err);
        }
        throw err;
      });
  }

  return (url, requestOptions = {}) => {
    const bearerToken = process.env.BROWSER ? getCookie('accessToken') : accessToken;
    const requestURL = createURL(hostname, url);

    if (!requestOptions.headers) {
      requestOptions.headers = {};
    }

    const { headers, body } = requestOptions;

    if (body) {
      requestOptions.body = JSON.stringify(body);
      Object.assign(headers, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
    }
    if (process.env.DEV) {
      console.info('requestURL:', requestURL);
    }

    // Append token to the headers
    if (!headers.Authorization) {
      headers.Authorization = bearerToken ? `Bearer ${bearerToken}` : basicAuthorization;
    }
    return fetch(requestURL, requestOptions).then(handleResponse);
  };
};
