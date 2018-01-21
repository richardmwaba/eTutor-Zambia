(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.exams.senior', [])
        .config(routeConfig).config(amChartConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('exams.senior', {
            url: '/senior',
            templateUrl: 'app/pages/exams/senior/senior.html',
            title: 'Senior Level',
            sidebarMeta: {
              order: 100,
            },
          });
    }
})();