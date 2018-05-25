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
        console.log(profile.displayName);
        console.log(profile.emails[0].value);

        var userid    = profile.id;
        var useremail = profile.emails[0].value;
        var userfirst = profile.name.givenName;
        var userlast  = profile.name.familyName;
        var username  = useremail.substring(0, useremail.indexOf("@"));

        req.pool.getConnection(function(err, connection){
          if(err) throw err;
          var sql = "SELECT username, email, google_id, password, ishost FROM users UNION ALL SELECT username, email, google_id, password, ishost FROM hosts";
          connection.query(sql, function(err, results){

            connection.release();
            var allUsers = results;
            console.log(allUsers);

            //check through the users array
            allUsers.forEach(function(user) {
              console.log("going through users array");
              if(userid == user.google_id) {
                //log this user in
                
              } else if(useremail == user.email) {
                //log this person in and...

                //assign google id to account
                user.google_id = userid;
                
              } 
            });



          });//connection query
        });//get connection pool



      

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