module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId : findUserByFacebookId,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserByGoogleId(googleId) {
        return User.findOne({"google.id": googleId});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({"facebook.id": facebookId});
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            {$set :
                {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            }
        );
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};