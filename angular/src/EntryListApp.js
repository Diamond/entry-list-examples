require('angular');

var myApp = angular.module('myApp',[]);
myApp.controller('EntryList', EntryList);

function EntryList($scope) {
  $scope.entries = [
    "a", "b", "c"
  ];
  $scope.addEntry = function() {
    $scope.entries.push($scope.newEntry);
    $scope.newEntry = "";
  };
};

