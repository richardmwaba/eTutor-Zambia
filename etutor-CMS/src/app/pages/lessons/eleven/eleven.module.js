(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.lessons.eleven', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('lessons.eleven', {
            url: '/eleven',
            templateUrl: 'app/pages/lessons/eleven/eleven.html',
            title: 'Eleven',
            sidebarMeta: {
              order: 200,
            },
          });
    }
})();