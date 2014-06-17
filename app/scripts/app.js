'use strict';

var mov = angular.module('mov', []);

/* Controllers
 * ========================================= */

mov.controller('MainCtrl', function($scope, $http, $filter, GetRawList, SuitableFor) {

  GetRawList.getRaw().then(function(data){
    $scope.rawMovies = data;
    $scope.movies = [];
    $scope.rawMovies.forEach(function(el, i){
      $http.jsonp('http://www.omdbapi.com/?i=' + el.id + '&callback=JSON_CALLBACK').then(function(result){
        result.data.suitable = el.suitable;
        if(result.data.imdbRating == "N/A"){
          result.data.imdbRating = 0;
        };
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
    return { 'width' : score == 0 ? '100%' : score * 10 + '%' }
  }

  $scope.suitableFor = SuitableFor;

  var orderBy = $filter('orderBy');
  $scope.orderMovies = function(predicate, reverse){
    $scope.movies = orderBy($scope.movies, predicate, reverse);
  }
});

mov.controller('HeaderCtrl', function($scope, SuitableFor) {
  $scope.humans = ['', 'Mom', 'DH', 'Pablo', 'Samus'];
  $scope.suitableFor = SuitableFor;
});


/* End Controllers */




/* Directives
 * ========================================= */

mov.directive('moviePoster', function(){
  return {
    restrict: 'E',
    scope: {
      movie: '='
    },
    templateUrl: 'templates/movie-poster.html',
    controller: function($scope){
      $scope.movie.Poster = $scope.movie.Poster.replace(/\._V1_SX300/g, '');
    }
  };
});

/* End Directives */




/* Filters
 * ========================================= */

mov.filter('encodeUri', function ($window) {
  return $window.encodeURIComponent;
});

/* End Filters */




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

mov.factory('SuitableFor', function(){
  return {
    selected: ''
  };
});

/* End Services */
