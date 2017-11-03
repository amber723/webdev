/**
 * Created by xinshu on 10/24/16.
 */
module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/project/user", createUser);
    app.get("/project/user", getUsers);
    app.get("/project/user/:userId", findUserById);
    app.put("/project/user/:userId", updateUser);
    app.get("/project/admin/user", findUsers);
    app.delete("/project/user/:userId", deleteUser);

    function createUser(req, res) {
        console.log("in Server side");
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function getUsers(req, res) {
        var email = req.query["email"];
        var password = req.query["password"];
        if(email && password){
            findUserByCredentials(email, password, res);
        }else if(email){
            findUserByEmail(email, res);
        }else{
            res.send(users);
        }
    }

    function findUserByCredentials(email, password, res) {
        userModel
            .findUserByCredentials(email, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findUserByEmail(email, res) {
        userModel
            .findUserByEmail(email)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }


    function findUsers(req, res){
        userModel
            .findUsers()
            .then(
                function (users) {
                    res.send(users);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function deleteUser(req, res){
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

};