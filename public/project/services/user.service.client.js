/**
 * Created by xinshu on 9/28/16.
 */
(function () {
    angular
        .module("projectApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByEmail: findUserByEmail,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findUsers: findUsers,
            deleteUser: deleteUser,
        };
        return api;

        function findUsers() {
            var url = "/project/admin/user";
            return $http.get(url);
        }

        function createUser(user) {
            var newUser = {
                email: user.email,
                username: user.username,
                password: user.password
            };
            return $http.post("/project/user", newUser);
        }

        function findUserById(userId) {
            var url = "/project/user/" + userId;
            return $http.get(url);
        }

        function findUserByEmail(email) {
            var url = "/project/user?email="+email;
            return $http.get(url);
        }

        function findUserByCredentials(email, password) {
            var url = "/project/user?email="+email+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/project/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/project/user/" + userId;
            return $http.delete(url);

        }
    }
})();