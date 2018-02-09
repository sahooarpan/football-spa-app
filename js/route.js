
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            // location of the template
            templateUrl: 'view/index-view.html',
            // Which controller it should use
            controller: 'eplController',
            // what is the alias of that controller.
            controllerAs: 'myData'
        })
        .when('/view-match/:date/:team1code/vs/:team2code', {
            templateUrl: 'view/match-view.html',
            controller: 'matchViewController',
            controllerAs: 'matchDetails'
        })
        .when('/team-view/:teamcode/:teamkey', {
            templateUrl: 'view/team-view.html',
            controller: 'teamViewController',
            controllerAs: 'teamDetails'
        })

        .otherwise({
            //redirectTo:'/' //we have a better option
            template: '<div class="notFound"><h1>404 page not found</h1><hr><a href="#/" class="btn btn-primary btn-primary"><span class="glyphicon glyphicon-home"></span> Go To HomePage</a></div>'
        });
}]);
