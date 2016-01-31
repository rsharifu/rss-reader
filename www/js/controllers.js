angular.module('starter.controllers', [])

.controller('MainCtrl', function($http, $scope) {

  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };


$scope.init = function() {
        $http.get("/sample.xml/sample.xml")
            .success(function(data) {
                var x2js = new X2JS();
                var jsonData = x2js.xml_str2json(data);
                console.log("jsonData=" + jsonData.rss.channel.title);
                console.log("jsonData.rss.channel.items=" + jsonData.rss.channel.item);
//                console.log("data.responseData=" + data.responseData);
//                $scope.rssTitle = data.responseData.feed.title;
//                $scope.rssUrl = data.responseData.feed.feedUrl;
//                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = jsonData.rss.channel.item;
//                window.localStorage["entries"] = JSON.stringify(jsonData.rss.channel.item);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
            });
}

$scope.onScroll = function() {
  console.log("onScroll");
}

});




