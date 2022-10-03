import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'IphoneDirectory',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44329',
    redirectUri: baseUrl,
    clientId: 'IphoneDirectory_App',
    responseType: 'code',
    scope: 'offline_access IphoneDirectory',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44329',
      rootNamespace: 'IphoneDirectory',
    },
  },
} as Environment;
