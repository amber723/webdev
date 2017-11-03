/**
 * Created by xinshu on 10/24/16.
 */
module.exports = function (app, models) {

    var userModel = models.userModel;
    var passport = require('passport');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var LocalStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var bcrypt = require('bcrypt-nodejs');

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/checkLogin", checkLogin);
    app.post("/api/checkAdmin", checkAdmin);
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    // app.get("/api/admin/user", admin, findAllUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", loggedInAndSelf, updateUser);
    app.delete("/api/user/:userId", loggedInAndSelf, deleteUser);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    var googleConfig = {
        clientID     : "221457899660-8jin17rtnhbfaoatonas1etchs9r7jsm.apps.googleusercontent.com",
        clientSecret : "f10QB_Gi62xWhvhkKUVGPr-T",
        callbackURL  : "http://localhost:8080/auth/google/callback"
    };

    var facebookConfig = {
        clientID     : "1811688299079458",
        clientSecret : "1d98a9ebebc728b8a29f895cd4fdfec2",
        callbackURL  : "http://localhost:8080/auth/facebook/callback"
    };
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function register(req, res) {
        var newUser = req.body;
        var username = newUser.username;
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("Username already in use");
                        return;
                    }else{
                        userModel
                            .createUser(newUser)
                            .then(
                                function (user) {
                                    if(user){
                                        req.login(user, function (err) {
                                            if(err){
                                                res.statusCode(400).send(err);
                                            }else{
                                                res.json(user);
                                            }
                                        });
                                    }
                                },
                                function (error) {
                                    res.statusCode(400).send(error);
                                }
                            );
                    }
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );


    }

    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.userId;
        var self = userId == req.user._id;
        if(self && loggedIn){
            next();
        }else{
            res.sendStatus(400).send("You're not the same person.");
        }
    }
    
    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            username:  profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }
    
    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == 'ADMIN';
        if(loggedIn && isAdmin){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (error) {
                    done(error, null );
                }
            )
    }

    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                },
                function (error) {
                    if(error){
                        return done(error);
                    }
                }
            )
    }
    
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res) {
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
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password){
            findUserByCredentials(username, password, res);
        }else if(username){
            findUserByUsername(username, res);
        }else{
            res.json(req.user);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
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
                    res.statusCode(400).send(error);
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
                    res.statusCode(400).send(error);
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