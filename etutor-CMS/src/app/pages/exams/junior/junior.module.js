(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.exams.junior', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('exams.junior', {
            url: '/junior',
            templateUrl: 'app/pages/exams/junior/junior.html',
            title: 'Junior Level',
            sidebarMeta: {
              order: 50,
            },
          });
    }
})();