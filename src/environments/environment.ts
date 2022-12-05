/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth_login_endpoint: '/api/v1/token',
  auth_request_password_endpoint: '/api/v1/usuarios/requestResetPassword.json',
  auth_reset_password_endpoint: '/api/v1/usuarios/resetPassword.json',
  auth_server_address: 'https://backend.dev.andromeda.himikode.es',
  api_server_address: 'https://backend.dev.andromeda.himikode.es/api/v1'  

  // auth_server_address: 'http://andromeda.himikode.es:81',
  // auth_login_endpoint: '/api/v1/token',
  // api_server_address: 'http://andromeda.himikode.es:81/api/v1'    
};