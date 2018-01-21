/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.exams', [ 
    'BlurAdmin.pages.exams.junior',
    'BlurAdmin.pages.exams.senior',
    'BlurAdmin.pages.exams.aLevel'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('exams', {
          url: '/exams',
          abstract: true,
          template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
          title: 'Exams',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 50,
          },
        });
  }

})();
