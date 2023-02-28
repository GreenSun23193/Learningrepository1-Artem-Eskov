'use strict';

//require('dotenv').config();

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
          return done(null, false, {message: 'Incorrect email.'});
        }
        let trueOrFalse = bcrypt.compareSync(password, user.password);
        if (!trueOrFalse) {
          console.log('here');
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'});
      } catch (err) {
        return done(err);
      }
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
    //secretOrKey: process.env.JWT_SECRET
},
function (jwtPayload, done) {
    console.log("113");
    console.log(jwtPayload);
    console.log(jwtPayload.user_id);
    return getUser(jwtPayload.user_id)
        .then(user => {
            console.log("user logged on well " + jwtPayload.user_id);
            return done(null, user);
        })
        .catch(err => {
            console.log("error getting user");
            console.log(err);
            return done(err);
        });
}
));

module.exports = passport;