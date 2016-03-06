// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// Routes
// On module loading
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MainCtrl'
    })
    .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html'
          }
        }
    })
    .state('app.entry-list', {
      url: '/entry-list/:feedId',
      views: {
        'menuContent': {
          templateUrl: 'templates/entry-list.html',
          controller: 'EntryListCtrl'
        }
      }
    })
    .state('app.entry-preview', {
        url: '/entry-list/:feedId/entry-preview/:entryId',
        views: {
          'menuContent': {
            templateUrl: 'templates/entry-preview.html',
            controller: 'EntryPreviewCtrl'
          }
        }
    })
    .state('app.feed-add', {
        url: '/feed-add',
        views: {
          'menuContent': {
            templateUrl: 'templates/feed-add.html',
            controller: 'FeedAddCtrl'
          }
        }
    })
    ;

    $urlRouterProvider.otherwise('/app/entry-list/0');
});


