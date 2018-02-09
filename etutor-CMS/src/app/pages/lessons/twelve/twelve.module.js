(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.lessons.twelve', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('lessons.twelve', {
            url: '/twelve',
            templateUrl: 'app/pages/lessons/twelve/twelve.html',
            title: 'Twelve',
            sidebarMeta: {
              order: 250,
            },
          });
    }
})();250