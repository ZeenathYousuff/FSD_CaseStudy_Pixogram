// const User = require("./../models/user");
let passport = require("passport");
let JwtStrategy = require("passport-jwt").Strategy;

const jwtOptions = require('./jwt-options');


module.exports = function (cb) {
    const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

        console.log('payload received', jwt_payload);

        // User.findByPk(jwt_payload.id).then(user => {
        //     logger.debug(user);
        //     if (!!user && jwt_payload.email === user.email) {
        //         user.password_hash = null;
        //         logger.debug("user found");
        //         next(null, user);
        //     } else {
        //         logger.debug("user not found");
        //         next(null, false);
        //     }
        // }).catch(err => {
        //     logger.debug(err);
        //     logger.debug("Error in select users")
        //     next(null, false);
        // })


        var isValid = true;
        if(isValid){
            next(null, {name: "Mark carl", age: 45, role: "admin"});
        } else {
            next(null, "Success");
        }

    })

    passport.use(strategy);
    console.log("Hiii")
    cb(passport);
}
