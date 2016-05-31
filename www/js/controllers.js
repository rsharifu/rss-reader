angular.module('starter.controllers', [])

.controller('MainCtrl', function($rootScope, $http, $scope, $state, DataFactory, LSFactory) {

	$scope.feeds = []

	$scope.addItems = function() {
		$scope.feeds = LSFactory.getAll();
		console.log("feeds: " + $scope.feeds.length)
		console.log("feeds: " + $scope.feeds[0].title)
	}

	$scope.addItems()

	$scope.onScroll = function() {
		console.log("onScroll");
	}

	$scope.onClickAddSubscription = function() {
		console.log("onClickAddSubscription")
		$state.go('app.feed-add')
	}


	$rootScope.$on('feedsCountChanged', function($event, scope, cancelCallback, callback) {
	  $scope.addItems();
  });

})

.controller('EntryPreviewCtrl', function($http, $scope, $stateParams, DataFactory) {
	$scope.entryId = $stateParams.entryId
	$scope.feedId = $stateParams.feedId

  // load data on page load
  DataFactory.getData($scope.feedId).then(function(data) {
  	$scope.entries = data;
  });
})

.controller('EntryListCtrl', function($http, $scope, $stateParams, DataFactory, Loader, LSFactory) {
	$scope.feedId = $stateParams.feedId
  $scope.feedTitle = LSFactory.getFeed($scope.feedId).title;
	$scope.share = function(item) {
  		alert('Share Item: ' + item.id);
  	};

  	$scope.isOn = true;

  	$scope.moveItem = function(item, fromIndex, toIndex) {
  		$scope.items.splice(fromIndex, 1);
  		$scope.items.splice(toIndex, 0, item);
  	};

  	$scope.doRefresh = function() {
  		DataFactory.getData($scope.feedId).then(function(data) {
  			Array.prototype.push.apply($scope.entries, data);
  		}).finally(function() {
  			// Stop the ion-refresher from spinning
  			$scope.$broadcast('scroll.refreshComplete');
  		});
  	}

  	$scope.loadMore = function() {
  		DataFactory.getData($scope.feedId).then(function(data) {
  			console.log("DataFactory.getData.then")
  			Array.prototype.push.apply($scope.entries, data);
  			}).finally(function() {
  			// Stop the ion-refresher from spinning
  			$scope.$broadcast('scroll.infiniteScrollComplete');
  		});
  	}

  	// load data on page load
  	Loader.showLoading();
  	DataFactory.getData($scope.feedId).then(function(data) {
  		$scope.entries = data;
  		Loader.hideLoading();
  	});
})

.controller('FeedAddCtrl', function($rootScope, $http, $scope, $stateParams, $ionicHistory,
                                    $ionicSideMenuDelegate, LSFactory) {
	$scope.data = {};

  $scope.add = function() {
    console.log("Add feed: " + $scope.data.title + " - PW: " + $scope.data.url);
    LSFactory.append("feed", {id: LSFactory.generateUuid(), title: $scope.data.title, url: $scope.data.url});
    // Go back to previous screen
    $ionicHistory.goBack();
    // Open side menu
    $ionicSideMenuDelegate.toggleLeft();

    // Broadcast the change
    $rootScope.$broadcast('feedsCountChanged', $scope, null, null);
	}
})
;
