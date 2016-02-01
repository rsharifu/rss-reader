angular.module('starter.services', [])

.factory('DataFactory', function($timeout, $http, $q) {
	var API = {
		getData: function() {
			var deferred = $q.defer();
			var output = [];
			$http.get("/sample.xml/sample.xml")
			.success(function(data) {
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
		}
	};
	return API;
});
