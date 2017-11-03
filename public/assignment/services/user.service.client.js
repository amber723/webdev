/**
 * Created by xinshu on 10/12/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {

        var api = {
            createUser: createUser,
            register: register,
            findUserById: findUserById,
            findCurrentUser: findCurrentUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin,
            logout: logout
        };
        return api;
        
        function register(user) {
            var newUser = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/register", newUser);
        }

        function checkLogin() {
            return $http.post("/api/checkLogin")
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin")
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }
        
        function createUser(user) {
            var newUser = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user", newUser);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findCurrentUser() {
            var url = "/api/user";
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);

        }
        
        function logout() {
            return $http.post("/api/logout");
        }
    }
})();