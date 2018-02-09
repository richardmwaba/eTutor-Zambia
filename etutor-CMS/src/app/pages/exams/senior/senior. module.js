(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.exams.senior', [])
        .config(routeConfig);
  
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