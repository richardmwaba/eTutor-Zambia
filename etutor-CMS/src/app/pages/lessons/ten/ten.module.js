(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.lessons.ten', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('lessons.ten', {
            url: '/ten',
            templateUrl: 'app/pages/lessons/ten/ten.html',
            title: 'Ten',
            sidebarMeta: {
              order: 150,
            },
          });
    }
})();