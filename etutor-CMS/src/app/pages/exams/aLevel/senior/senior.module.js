(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.exams.senior', [])
        .config(routeConfig).config(amChartConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('exams.senior', {
            url: '/junior',
            templateUrl: 'app/pages/exams/junior/senior.html',
            title: 'Junior',
            sidebarMeta: {
              order: 50,
            },
          });
    }
})();