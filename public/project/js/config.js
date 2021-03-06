/**
 * Created by xinshu on 9/28/16.
 */
(function () {

    angular
        .module("projectApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.html"
            })
            .when("/admin/:uid", {
                templateUrl: "views/admin/user-list.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/user/login.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/user/register.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:id",{
                templateUrl: "views/user/profile.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/song", {
                templateUrl: "views/song/search-song.html",
                controller: "SearchSongController",
                controllerAs: "model"
            })

            // Studio Config
            .when("/user/:uid/song",{
                templateUrl: "views/user/song-list.html",
                controller: "SongListController",
                controllerAs: "model"
            })
            .when("/user/:uid/song/new",{
                templateUrl: "views/studio/new-song.html",
                controller: "NewSongController",
                controllerAs: "vm"
            })
            .when("/user/:uid/song/:sid", {
                templateUrl: "views/studio/song-edit.html",
                controller: "EditSongController",
                controllerAs: "model"
            })
            .when("/user/:uid/song/:sid/instrument/drum", {
                templateUrl: "views/panel/drum-panel.html",
                controller: "drumController",
                controllerAs: "model"
            })
            .when("/user/:uid/song/:sid/instrument/bass", {
                templateUrl: "views/panel/bass-panel.html"
            })
            .when("/user/:uid/song/:sid/instrument/xylophone", {
                templateUrl: "views/panel/xylophone-panel.html"
                // controller: "xylophoneController",
                // controllerAs: "model"
            })
            .when("/user/:uid/song/:sid/instrument/piano", {
                templateUrl: "views/panel/piano-panel.html",
                controller: "pianoController",
                controllerAs: "model"
            })

            // Course Config
            .when("/courseList", {
                templateUrl: "views/course/course-list.html"
            })
            .when("/featuredCourse", {
                templateUrl: "views/course/featured-course.html"
            })
            .when("/mycourse", {
                templateUrl: "views/course/my-course.html"
            })

            .otherwise({
                redirectTo: "/login"
            });
    }
})();