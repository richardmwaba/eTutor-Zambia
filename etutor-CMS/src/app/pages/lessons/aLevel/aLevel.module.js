(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.lessons.aLevel', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('lessons.aLevel', {
            url: '/a-level',
            templateUrl: 'app/pages/lessons/aLevel/a-level.html',
            title: 'A-level',
            sidebarMeta: {
              order: 0,
            },
          });
    }
})();