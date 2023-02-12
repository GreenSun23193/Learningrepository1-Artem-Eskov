'use strict';
   const passport = require('passport');
   const Strategy = require('passport-local').Strategy;
   
   // fake database: ****************
   const users = [
     {
       user_id: 1,
       name: 'Foo Bar',
       email: 'foo@bar.fi',
       password: 'foobar',
     },
     {
       user_id: 2,
       name: 'Bar Foo',
       email: 'bar@foo.fi',
       password: 'barfoo',
     },
   ];
   // *******************

   // fake database functions *********
    const getUser = (id) => {
    console.log("getUser check 1");
      const user = users.filter((usr) => {
        if (usr.user_id === id) {
            console.log("getUser check 2a");
          return usr;
        }
      });
      console.log("getUser check 2b");
      return user[0];
    };
    
    const getUserLogin = (email) => {
        console.log("getUserLogin check 1");
      const user = users.filter((usr) => {
        console.log("getUserLogin check 2");
        if (usr.email === email) {
            console.log("getUserLogin check 2a");
          return usr;
        }
      });
      console.log("getUserLogin check 3");
      return user[0];
    };
    // *****************
    
   // serialize: store user id in session 

   /*passport.serializeUser(function(user, done) {
    console.log("serializeUser check 1");
    process.nextTick(function() {
        console.log("serializeUser check 2");
      return done(null, {
        id: users.user_id
      });
    });
    console.log("serializeUser check 3");
  });*/

   passport.serializeUser((id, done) => {
     console.log('serialize', id);
     // serialize user id by adding it to 'done()' callback

     console.log("serializeUser TWO check ZERO");
     console.log(id);

     done(null, id);

     console.log("serializeUser TWO check");

   });
   
   //console.log("pre deserializeUser");

   // deserialize: get user id from session and get all user data
   passport.deserializeUser(async (id, done) => {
       // get user data by id from getUser

       console.log("deserializeUser getUser check 1");
       var user = getUser(id);
       console.log("deserializeUser getUser check 2");

       console.log('deserialize', user);
       // deserialize user by adding it to 'done()' callback

       done(null, user);
   });
   
   passport.use(new Strategy(
       (username, password, done) => {
         // get user by username from getUserLogin

         console.log("login check");

         var userByEmail = getUserLogin(username);

         // if user is undefined

         console.log("login check 2");

         if (userByEmail == undefined) {

        console.log("login check undefined");

         // return done(null, false);


         return done(null, false);
        }

         // if passwords dont match

         else if (userByEmail.password != password) {

         // return done(null, false);

        console.log("login check wrong password");

         return done(null, false);
        }

         // if all is ok

         else {
         // return done(null, user.user_id);

        console.log("login check true");
        console.log(userByEmail.user_id);

         return done(null, userByEmail.user_id);

        }
       }
   ));
   
   module.exports = passport;