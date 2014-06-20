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
    replace: true,
    scope: {
      movie: '='
    },
    templateUrl: 'templates/movie-poster.html',
    controller: function($scope){
      $scope.movie.Poster = $scope.movie.Poster.replace(/\._V1_SX300/g, '');
    }
  };
});

mov.directive('bar', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      scoreValue: '@',
      scoreLabel: '@',
      scoreType: '@'
    },
    templateUrl: 'templates/bar.html',
    controller: function($scope){
      $scope.validateScore = function(score){
        if(score === "N/A"){
          return false;
        }
        else {
          return true;
        }
      };
      $scope.barWidth = function(score){
        console.log(score)
        return { 'width' : score + '%' }
      }
    }
  };
});

/* End Directives */




/* Filters
 * ========================================= */

mov.filter('encodeUri', function ($window) {
  return $window.encodeURIComponent;
});

mov.filter('parseFloat', function () {
  return function(input, multiplyByTen){
    return multiplyByTen ? (parseFloat(input) * 10) : (parseFloat(input))
  };
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
