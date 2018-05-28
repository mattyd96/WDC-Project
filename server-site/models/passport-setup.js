const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
var mysql = require('mysql');
var dbConnectionPool = mysql.createPool({ host: 'localhost', user: 'root', password: 'Kratos96',database: 'wdc_hotel_website_data'});

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done)=> {
  dbConnectionPool.getConnection(function(err, connection){
    if(err) throw err;
    var sql = "SELECT username, email, google_id, password, ishost FROM users WHERE username=?";
    connection.query(sql, [username], function(err, results){
      connection.release();
      done(null, results);
    });
  });
});


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

        dbConnectionPool.getConnection(function(err, connection){
          if(err) throw err;
          var sql = "SELECT username, email, google_id, password, ishost FROM users UNION ALL SELECT username, email, google_id, password, ishost FROM hosts";
          connection.query(sql, function(err, results){

            connection.release();
            var allUsers = results;
            var foundUser = false;

            //check through the users array
            allUsers.forEach(function(user) {
              console.log("going through users array");
              if(userid == user.google_id) {
                //log this user in
                console.log('user is: ', user);
                foundUser = true;

                done(null, user);
                
              } else if(useremail == user.email) {
                //log this person in and...
                //assign google id to account
                console.log("made a match");
                dbConnectionPool.getConnection(function(err, connection){
                  if(err) throw err;
                  var sql = "UPDATE users SET google_id=? WHERE email=?";
                  connection.query(sql, [userid, useremail], function(err, results){
                  connection.release();
                  
                  console.log('user is: ', results);
                  done(null, results[0]);
                  });
              });

                foundUser = true;
              } 

              if(!foundUser) {
                //create user
                dbConnectionPool.getConnection(function(err, connection){
                  if(err) throw err;
                  var sql = "INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?);";
                  connection.query(sql, [username, userfirst, userlast, useremail], function(err, results){
                    console.log(results);
                    connection.release();
  
                    //make another request to grab that created user
                    dbConnectionPool.getConnection(function(err, connection){
                      if(err) throw err;
                      var sql = "SELECT username, email, google_id, password, ishost FROM users WHERE username=?;";
                      connection.query(sql, [username], function(err, results){
                        console.log(results[0]);
                        connection.release();
                        
                        console.log('user is: ', results[0]);
                        done(null, results[0]);
                        
                      });
                    });
                  });
                });
              }
            });

          });//connection query
        });//get connection pool
        
      //if there is no user redirect to a special page with just the user account creation modal
      //fill that modal with what google does give you
      //prompt the user to fill out the rest - specifically a unique password and username
      //submit that form through the normal route
      
      console.log("went through entire 'then'");
        
    })
);