(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.lessons.eight', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('lessons.eight', {
            url: '/eight',
            templateUrl: 'app/pages/lessons/eight/eight.html',
            title: 'Eight',
            sidebarMeta: {
              order: 50,
            },
          });
    }
})();