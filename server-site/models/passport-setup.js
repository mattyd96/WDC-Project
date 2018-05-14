const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

var users = require('./User').users;
var hosts = require('./User').hosts;


passport.use(
    new GoogleStrategy({
        callbackURL: '/users/google/addUsername',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {

        console.log('passport callback function fired');
        console.log(profile);
        console.log(users);

        var userid    = profile.id;
        var useremail = profile.email;
        var userfirst = profile.name.givenName;
        var userlast  = profile.name.familyName;

        
        //check through the users array
      users.forEach(function(user) {
        console.log("going through users array");
        if(userid == user.google) {
          //log this user in
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = false;

        } else if(useremail == user.email) {
          //log this person in and...
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = false;

          //assign google id to account
          user.google = userid;
          
        } 
      });

      //check through the hosts array
      hosts.forEach(function(user) {
        if(userid == user.google) {
          //log this user in
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = true;

          res.redirect('../');
        } else if(useremail == user.email) {
          //log this person in and...
          req.session.username = user.username;
          req.session.password = user.password;
          req.session.isHost   = true;

          //assign google id to account
          user.google = userid;

        } 
      });

      //if there is no user redirect to a special page with just the user account creation modal
      //fill that modal with what google does give you
      //prompt the user to fill out the rest - specifically a unique password and username
      //submit that form through the normal route

      var newUser = {
        first_name: userfirst,
        last_name: userlast,
        email: useremail,
      }

      
      console.log("went through entire 'then'");
      console.log(newUser);
        
    })
);