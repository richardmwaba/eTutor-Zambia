/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.lessons', [
    'BlurAdmin.pages.lessons.aLevel',
    'BlurAdmin.pages.lessons.eight',
    'BlurAdmin.pages.lessons.nine',
    'BlurAdmin.pages.lessons.ten',
    'BlurAdmin.pages.lessons.eleven',
    'BlurAdmin.pages.lessons.twelve'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('lessons', {
          url: '/lessons',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Lessons',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 100,
          },
        });
  }

})();
