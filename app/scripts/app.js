'use strict';

var mov = angular.module('mov', []);

/* Controllers
 * ========================================= */

mov.controller('MainCtrl', function ($scope, $http, GetRawList) {
  GetRawList.getRaw().then(function(data){
    $scope.rawMovies = data;
    $scope.movies = [];
    $scope.rawMovies.forEach(function(el, i){
      $http.jsonp('http://www.omdbapi.com/?i=' + el + '&callback=JSON_CALLBACK').then(function(result){
        $scope.movies.push(result.data);
      });
    });
  });
  $scope.validateMetascore = function(score){
    if(score === "N/A"){
      return false;
    }
    else {
      return true;
    }
  }
  $scope.metacriticBar = function(score){
    return { 'width' : score + '%' }
  }
  $scope.imdbBar = function(score){
    return { 'width' : score * 10 + '%' }
  }
});

/* End Controllers */




/* Services
 * ========================================= */

mov.factory('GetRawList', function($http){
  return {
    getRaw : function(){
      return $http.get('scripts/movies.json').then(function(result){
        return result.data;
      });
    }
  };
});

/* End Services */
