module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByEmail: findUserByEmail,
        findUserById: findUserById,
        updateUser: updateUser,
        findUsers: findUsers,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByCredentials(email, password) {
        return User.findOne({email: email, password: password});
    }
    
    function findUserByEmail(email) {
        return User.findOne({email: email});
    }
    
    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            {$set : {
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password,
                    role: newUser.role,
            }}
        );
    }

    function findUsers() {
        return User.find({});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};