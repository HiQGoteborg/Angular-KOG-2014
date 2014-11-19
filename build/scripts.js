angular.module("angular-kog",["ngRoute","ngAnimate"]),angular.module("angular-kog").directive("loader",function(){return{restrict:"E",replace:!0,templateUrl:"loader.tpl.html"}}),angular.module("angular-kog").controller("ProfileListCtrl",["$scope","$location","ProfilesApiService",function(a,b,c){c.getAllProfiles(function(b){a.profiles=b}),a.open=function(a){b.path("/Profile/"+a)}}]).controller("ProfileCtrl",["$scope","$routeParams","$sce","ProfilesApiService",function(a,b,c,d){d.getProfile(b.id,function(b){var d=new RegExp(b.firstName,"gi"),e=b.description.replace(d,"<b>"+b.firstName+"</b>");b.htmlDescription=c.trustAsHtml(e),a.profile=b})}]),angular.module("angular-kog").constant("ProfilesApiBaseUrl","http://localhost:8001/data/").factory("ProfilesApiService",["$http","ProfilesApiBaseUrl",function(a,b){return{getAllProfiles:function(c){a.get(b+"profiles").success(c)},getProfile:function(c,d){a.get(b+"profiles").success(function(a){d(a[c])})}}}]),angular.module("angular-kog").config(["$routeProvider",function(a){a.when("/Profiles",{templateUrl:"profilelist.tpl.html",controller:"ProfileListCtrl"}).when("/Profile/:id",{templateUrl:"profile.tpl.html",controller:"ProfileCtrl"}).when("/About",{templateUrl:"about.tpl.html"}).otherwise({templateUrl:"home.tpl.html"})}]);angular.module('angular-kog').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('loader.tpl.html',
    "<div class=\"loading-container\"><i class=\"loading glyphicon glyphicon-refresh\"></i></div>"
  );


  $templateCache.put('about.tpl.html',
    "<div class=\"jumbotron\"><h1>About</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>"
  );


  $templateCache.put('home.tpl.html',
    "<div class=\"jumbotron\"><h1>The Simpsons</h1><p>This is just an example project for the angular KOG</p></div>"
  );


  $templateCache.put('profile.tpl.html',
    "<div class=\"profile\" ng-if=\"profile\"><div class=\"header clearfix\"><div class=\"left\"><!-- Use ng-src instead of src to prevent rendering before angular compilation --><img ng-src=\"{{profile.imageUrl}}\"></div><div class=\"left\"><h2>{{profile.firstName}} {{profile.lastName}}</h2><h3>{{profile.role}}</h3><h4><i class=\"glyphicon glyphicon-thumbs-up\"></i> {{profile.likes.join(', ')}}</h4><h4><i class=\"glyphicon glyphicon-thumbs-down\"></i> {{profile.dislikes.join(', ')}}</h4></div></div><div class=\"description\" ng-bind-html=\"profile.htmlDescription\"></div></div><loader ng-if=\"!profile\"></loader>"
  );


  $templateCache.put('profilelist.tpl.html',
    "<div class=\"profile-list\"><ul ng-if=\"profiles\"><li ng-repeat=\"profile in profiles\" class=\"clearfix\" ng-click=\"open(profile.id)\"><div class=\"left\"><!-- Use ng-src instead of src to prevent rendering before angular compilation --><img ng-src=\"{{profile.imageUrl}}\"></div><div class=\"left\"><h2>{{profile.firstName}} {{profile.lastName}}</h2><p>{{profile.role}}</p></div><div class=\"arrow\"></div></li></ul><loader ng-if=\"!profiles\"></loader></div>"
  );

}]);
