angular.module('starter.controllers', [])

.controller('MainCtrl', function($http, $scope, DataFactory) {

	$scope.share = function(item) {
		alert('Share Item: ' + item.id);
	};

	$scope.isOn = true;

	$scope.moveItem = function(item, fromIndex, toIndex) {
		$scope.items.splice(fromIndex, 1);
		$scope.items.splice(toIndex, 0, item);
	};

	$scope.doRefresh = function() {
		DataFactory.getData()
		.then(function(data) {
			Array.prototype.push.apply($scope.entries, data);
			}).finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		});
	}

	$scope.loadMore = function() {
		DataFactory.getData()
		.then(function(data) {
		  console.log("DataFactory.getData.then")
			Array.prototype.push.apply($scope.entries, data);
			}).finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	}

	// load data on page load
	DataFactory.getData().then(function(data) {
		$scope.entries = data;
	});

	$scope.onScroll = function() {
		console.log("onScroll");
	}

})


.controller('PreviewCtrl', function($http, $scope, $stateParams) {
  $scope.feedId = $stateParams.feedId


});

