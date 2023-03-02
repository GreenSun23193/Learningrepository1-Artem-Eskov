'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { getUserLogin, getUser } = require('../models/userModel');

const passportJWT = require("passport-jwt");
const JWTStrategy  = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require( 'bcryptjs' );

passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await getUserLogin(params);
        console.log('Local strategy', user);
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect name.'});
        }
        let trueOrFalse = bcrypt.compareSync(password, user.password);
        if (!trueOrFalse) {
          console.log('here');
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'You have logged in successfully.'});
      } catch (err) {
        return done(err);
      }
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, done) {
    return getUser(jwtPayload.user_id)
        .then(user => {
            console.log("user logged succesfully:  " + jwtPayload.user_id);
            return done(null, user);
        })
        .catch(err => {
            console.log("error, can't get user");
            console.log(err);
            return done(err);
        });
}
));

module.exports = passport;