'use strict';

var mov = angular.module('mov', []);

/* Controllers
 * ========================================= */

mov.controller('MainCtrl', function($scope, $http, $filter, GetRawList, SuitableFor) {

  GetRawList.getRaw().then(function(data){
    $scope.rawMovies = data;
    $scope.movies = [];
    $scope.rawMovies.forEach(function(el){
      $http.jsonp('http://www.omdbapi.com/?i=' + el.id + '&callback=JSON_CALLBACK').then(function(result){
        result.data.suitable = el.suitable;
        if(result.data.imdbRating === 'N/A'){
          result.data.imdbRating = 0;
        }
        $scope.movies.push(result.data);
      });
    });
  });


  $scope.metacriticBar = function(score){
    return { 'width' : score + '%' };
  };

  $scope.imdbBar = function(score){
    return { 'width' : score === 0 ? '100%' : score * 10 + '%' };
  };

  $scope.suitableFor = SuitableFor;

  var orderBy = $filter('orderBy');
  $scope.orderMovies = function(predicate, reverse){
    $scope.movies = orderBy($scope.movies, predicate, reverse);
  };
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
        if(score === 'N/A'){
          return false;
        }
        else {
          return true;
        }
      };
      $scope.barWidth = function(score){
        var linear0100toMinMax = function(value, min, max){
          var n = value * (max - min) / 100 + min;
          return [Math.floor(n), Math.ceil(n)];
        };
        var interpolateColors = function(value, colors){
          if(colors.length === 2){
            return 'rgb(' +
              linear0100toMinMax(value, colors[0].r, colors[1].r)[0] + ', ' +
              linear0100toMinMax(value, colors[0].g, colors[1].g)[0] + ', ' +
              linear0100toMinMax(value, colors[0].b, colors[1].b)[0] + ')';
          }
          else{
            var numColors = colors.length - 1;
            var colorIndexes = linear0100toMinMax(value, 0, numColors);
            var newValue = (value - ((100 / numColors) * colorIndexes[0])) * numColors;
            return interpolateColors(newValue, [colors[colorIndexes[0]], colors[colorIndexes[1]]]);
          }
        };
        return {
          'width' : score + '%',
          'background-color' : interpolateColors(
            score,
            [
              { r:215, g:0,   b:0   },
              { r:240, g:160, b:40  },
              { r:240, g:240, b:70  },
              { r:60,  g:210, b:210 },
              { r:0,   g:215, b:0   }
            ]
          )
        };
      };
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
    return multiplyByTen ? (parseFloat(input) * 10) : (parseFloat(input));
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
