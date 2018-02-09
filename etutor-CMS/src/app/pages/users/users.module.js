/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('users', {
          url: '/users',
          //template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          templateUrl: 'app/pages/users/smart/tables.html',
          //abstract: true,
          controller: 'UsersPageCtrl',
          title: 'Users',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 150,
          },
        })
  }

})();
