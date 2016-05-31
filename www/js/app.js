// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angularMoment'])

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


.constant('SAMPLE_FEED', {id:0, title: 'sample.xml', url: "http://www.feedforall.com/sample.xml"})
.constant('SAMPLE_FEED_2', {id:1, title: 'android weekly', url: "http://us2.campaign-archive2.com/feed?u=887caf4f48db76fd91e20a06d&id=4eb677ad19"})
.constant('SAMPLE_FEED_3', {id:2, title: 'Coming soon', url: "http://www.comingsoon.net/feed"})


// Routes
// On module loading
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.views.transition('platform');
  $ionicConfigProvider.navBar.alignTitle('center');

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

    $httpProvider.interceptors.push(function ($q) {
      return {
        'request': function (config) {
          if (!window.cordova) {
            // Replace proxied URL
            config.url = config.url.replace("http://www.feedforall.com/", "/feedforall/");
            config.url = config.url.replace("http://us2.campaign-archive1.com/", "/us2.campaign-archive1/");
            config.url = config.url.replace("http://us2.campaign-archive.com/", "/us2.campaign-archive/");
            config.url = config.url.replace("http://us2.campaign-archive2.com/", "/us2.campaign-archive2/");
            config.url = config.url.replace("http://www.comingsoon.net/", "/www.comingsoon.net/");
          }
          return config || $q.when(config);
        }
      }
    });
})
;

moment.lang('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s",
        s:  "seconds",
        m:  "1m",
        mm: "%m",
        h:  "1h",
        hh: "%h",
        d:  "1d",
        dd: "%dd",
        M:  "1m",
        MM: "%dm",
        y:  "1y",
        yy: "%dy"
    }
});

