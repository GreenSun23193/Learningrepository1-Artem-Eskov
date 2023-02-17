'use strict';

//require('dotenv').config();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const { getUserLogin, getUser } = require('../models/userModel');

const passportJWT = require("passport-jwt");
const JWTStrategy  = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
    //secretOrKey: process.env.JWT_SECRET
},
function (jwtPayload, done) {
    console.log("113");
    console.log(jwtPayload);
    console.log(jwtPayload.user_id);
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return getUser(jwtPayload.user_id)
        .then(user => {
            console.log("111");
            return done(null, user);
        })
        .catch(err => {
            console.log("112");
            return done(err);
        });
}
));

module.exports = passport;