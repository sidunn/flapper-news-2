var app = angular.module('flapperNews', ['ui.router'])
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
    })

    .state('posts', {
     url: '/posts/{id}',
     templateUrl: '/posts.html',
     controller: 'PostsCtrl'
    })


  $urlRouterProvider.otherwise('home');
}])


/* In tutorial's Angular Routing section, "Create the config block..." do NOT delete the portion
of the previous app.js file that follows the new config block. */


app.factory('posts', [function(){
   var o = {
     posts: []
   };
   return o;
 }])
app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;
  
  
  $scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0,
    comments: [
      {author: 'Joe', body: 'Cool post!', upvotes: 0},
      {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
    ]
  });
 
 
  $scope.title = '';
  $scope.link = '';
  }; 
  $scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
  };
  
  /* PostsCtrl here??? Yes!  */
  app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
  
  }]);
  
  $scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};



}]);
 