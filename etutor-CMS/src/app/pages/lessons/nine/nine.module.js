(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.lessons.nine', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('lessons.nine', {
            url: '/nine',
            templateUrl: 'app/pages/lessons/nine/nine.html',
            title: 'Nine',
            sidebarMeta: {
              order: 100,
            },
          });
    }
})();