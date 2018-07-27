// @flow

const host = '';
const api = 'api';
const version = 'v1';

export default {
  diskUrl: (pathname = '') => {
    const [, ...pathNameParts] = pathname.split('/')
      .filter(v => v !== '');

    return [host, api, version, 'disk', ...pathNameParts].join('/');
  },
  authUrl: (email, password) => [host, api, version, 'authorize'].join('/'),
};
