const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");

module.exports = passport => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, done) => done(null, user.id));

    // used to deserialize the user
    passport.deserializeUser((id, done) =>
        User.findById(id, (err, user) => done(err, user))
    );

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            (req, email, password, done) => {
                process.nextTick(() => {
                    User.find({ "local.email": email }, (err, user) => {
                        if (err) return done(err);

                        if (Array.isArray(user) && user.length === 0) {
                            const newUser = new User();
                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(
                                password
                            );
                            // save the user
                            newUser.save(err => {
                                if (err) throw err;
                                return done(null, newUser);
                            });
                        } else {
                            return done(null, false, {
                                message: "That email is already taken."
                            });
                        }
                    });
                });
            }
        )
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            (req, email, password, done) => {
                // callback with email and password from our form
                try {
                    User.findOne({ "local.email": email })
                        .populate("movies")
                        .then(user => {
                            if (!user) {
                                return done(null, false, {
                                    message: "User not found"
                                });
                            }
                            if (!user.validPassword(password)) {
                                return done(null, false, {
                                    message: "Invalid Password"
                                });
                            }
                            return done(null, user);
                        });
                } catch (error) {
                    console.log("error from passport: ", error);
                    return done(null, false, {
                        message: "There was an error with your request."
                    });
                }
            }
        )
    );
};
