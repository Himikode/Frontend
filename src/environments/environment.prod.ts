/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  auth_login_endpoint: '/api/v1/token',
  auth_request_password_endpoint: '/api/v1/usuarios/requestResetPassword.json',
  auth_reset_password_endpoint: '/api/v1/usuarios/resetPassword.json',

  // auth_server_address: 'http://andromeda.himikode.es:81',
  // api_server_address: 'http://andromeda.himikode.es:81/api/v1'  
  auth_server_address: 'https://backend.andromeda.himikode.es',
  api_server_address: 'https://backend.andromeda.himikode.es/api/v1'  
};
