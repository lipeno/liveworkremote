angular.module('angularApp').service("Session", function($location, $http, $q, $rootScope) {
    this.isAuthorized = function() {
        if ($("meta[name='current_user']")) {
            $rootScope.current_user = JSON.parse($("meta[name='current_user']").attr('content'));
        }
        return ($rootScope.current_user != null) && ($rootScope.current_user.id != null);
    };
    this.isAdmin = function() {
        if (this.isAuthorized() && $rootScope.current_user.role === "admin") {
             return true;
        }
        else {
            return false;
        }
    };
    this.signin = function(user) {
        return $http({
            method: "POST",
            url: "/signin",
            data: {
                user: {
                    email: user.email,
                    password: user.password
                }
            }
        }).success(function(data) {
            $("meta[name='current_user']").attr('content', JSON.stringify(data));
            $rootScope.current_user = JSON.stringify(data);
            return $location.path("/home");
        }).error(function(data, status) {
            return $location.path("/home");
        });
    };
    this.signout = function() {
        return $http({
            method: "DELETE",
            url: "/signout"
        }).success(function(data) {
            $("meta[name='current_user']").attr('content', "null");
            $rootScope.current_user = null;
            return $location.path("/auth");
        }).error(function(data, status) {
            return $location.path("/home");
        });
    };
    this.signup = function(user) {
        var registerData;
        registerData = {
            user: {
                email: user.email,
                password: user.password,
                password_confirmation: user.confirm_password,
                season_type: "summer"
            }
        };
        return $http.post("/signup", registerData).success(function(data) {
            $("meta[name='current_user']").attr('content', JSON.stringify(data));
            return $location.path("/");
        }).error(function(data) {
            console.log("errors", data);
            return $location.path("/home");
        });
    };
    this.requestCurrentUser = function() {
        return $http.get("/current_user").success(function(data) {
            var currentUser;
            return currentUser = JSON.stringify(data);
        }).error(function(data) {
            console.log("errors", data);
            return data;
        });
    };
});