angular.module('starter.services', [])

.factory('DataFactory', function($timeout, $http, $q, LSFactory) {
	var API = {
		getData: function($feedId) {
			var deferred = $q.defer();
			var output = [];
			var feed = LSFactory.getFeed($feedId);
			if(feed){
				$http.get(feed.url).success(function(data) {
					var x2js = new X2JS();
					var jsonData = x2js.xml_str2json(data);
					console.log("jsonData=" + jsonData.rss.channel.title);
					console.log("jsonData.rss.channel.items=" + jsonData.rss.channel.item);
					output = jsonData.rss.channel.item;
					var surrogateId = 0;
					for (var ordinal in output){
						var item = output[ordinal];
						item.id = surrogateId;
						surrogateId++;
					}
					deferred.resolve(output);
				})
				.error(function(data) {
					console.log("ERROR: " + data);
					if(window.localStorage["entries"] !== undefined) {
						$scope.entries = JSON.parse(window.localStorage["entries"]);
					}
					deferred.reject();
				});

				return deferred.promise;
				} else {
				return deferred.promise;
			}
		}
	};
	return API;
})

.factory('LSFactory', [function() {
	var LSAPI = {
		clear: function() {
			return localStorage.clear();
		},
		get: function(key) {
			return JSON.parse(localStorage.getItem(key));
		},
		getFeed: function(feedId) {
			console.log("LSAPI.getAll: " + feedId);
			var feeds = LSAPI.getAll();
			console.log("feeds");
			var result = feeds.filter(function (feed) {
				console.log("feed.id" + feed.id);
				return String(feed.id).localeCompare(String(feedId)) == 0;
			})[0];
			if(result) console.log("result" + result.url);
			return result;
		},
		set: function(key, data) {
			return localStorage.setItem(key, JSON.stringify(data));
		},
		append: function(key, data) {
			var feeds = LSAPI.getAll();
			feeds.push(data);
			return localStorage.setItem(key, JSON.stringify(feeds));
		},
		delete: function(key) {
			return localStorage.removeItem(key);
		},
		getAll: function() {
			var feeds = [];
			var items = Object.keys(localStorage);
			for (var i = 0; i < items.length; i++) {
				if (items[i] !== 'user' || items[i] != 'token') {
					Array.prototype.push.apply(feeds, JSON.parse(localStorage[items[i]]));
				}
			}
			return feeds;
		},
		generateUuid:function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		},
		testValues: function(){
			feeds = LSAPI.getAll();
			if(!feeds || feeds.length == 0){
				LSAPI.append("feed", {id:0, title: 'sample.xml', url: "http://www.feedforall.com/sample.xml"});
			}
		}
	};
	LSAPI.testValues();
	return LSAPI;
}])

.factory('Loader', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {
		var LOADERAPI = {
			showLoading: function(text) {
				text = text || 'Loading...';
				$ionicLoading.show({
					template: text
				});
			},
			hideLoading: function() {
				$ionicLoading.hide();
			},
			toggleLoadingWithMessage: function(text, timeout) {
				$rootScope.showLoading(text);
				$timeout(function() {
					$rootScope.hideLoading();
				}, timeout || 3000);
			}
		};
		return LOADERAPI;
	}])


	;
