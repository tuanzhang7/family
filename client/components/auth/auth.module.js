'use strict';

angular.module('familyApp.auth', [
  'familyApp.constants',
  'familyApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
