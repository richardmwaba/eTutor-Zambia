(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.exams.aLevel', [])
        .config(routeConfig).config(amChartConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('exams.aLevel', {
            url: '/a-level',
            templateUrl: 'app/pages/exams/aLevel/a-level.html',
            title: 'A-level',
            sidebarMeta: {
              order: 0,
            },
          });
    }
})();