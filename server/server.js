require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors');
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const massive = require('massive');
// Require statements

const app = express();

app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: true
}))
app.use(cors());
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING)
.then( db => {
   app.set('db', db) // Massive
})

passport.use( new Auth0Strategy({ // Auth(0)
   domain: process.env.AUTH_DOMAIN,
   clientID: process.env.AUTH_CLIENT_ID,
   clientSecret: process.env.AUTH_CLIENT_SECRET,
   callbackURL: process.env.AUTH_CALLBACK
 }, function(accessToken, refreshToken, extraParams, profile, done) {
   const db = app.get('db');
       db.get_user([profile.identities[0].user_id]).then( user => {
           if (user[0]) {
               done(null, user[0].id)
           } else { // Auth(0)
               db.create_user([
                   profile.emails[0].value,
                   profile.identities[0].user_id]).then( user => {
                       done(null, user[0].id) // Auth(0)
                   })
           }})
     }))

    passport.serializeUser(function(userId, done) {
        console.log("serialize")
       done(null, userId); // Auth(0)
   })
     passport.deserializeUser( function( userId, done) {
         console.log("deserialize")
       app.get('db').current_user(userId).then(user => {
               done(null, user[0]) //  Auth(0)
   })
   })
   app.get('/auth', passport.authenticate('auth0'));
   app.get('/auth/callback', passport.authenticate('auth0',{
       successRedirect: 'http://localhost:3000/#/Authpage',
       failureRedirect: '/auth' //  Auth(0) Redirect
   }))

   app.get('/auth/logout', (req,res) => {
    req.logOut();
    res.redirect(302, 'https://nickyates.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000%2F&client_id=cmkZXOSvf0ysUnfmoox72HSFhXConTk9') // Auth(0) Logout
})


   app.get('/api/user',  passport.authenticate('auth0'), (req, res) => {
       req.app.get('db').current_user().then(user =>{
           res.status(200).send(user)
       }).catch((err) => {console.log(err)}) // Auth(0)
   })

   app.post('/api/posts', (req, res) => {
       const post = app.get('db')
       req.app.get('db').create_post([req.user.id, req.body.text]).then(blog => {
           res.send() // Creates post with all the different data types within my table and send's it to my database to be stored.
       })
   })

   
   app.get('/api/posts', (req,res) => {
    app.get('db').selectpostId(req.user.id)
    .then(blogs => {
        res.status(200).send(blogs);    
    }).catch((err) => {console.log(err)}) // Fetching all the data in my blogs table in my database which is then displaying to the front end with an axios call on my authpage.
   })


app.get('/api/users', (req, res) => {
    app.get('db').current_user([req.user.id])
    .then(users => {
        res.status(200).send(users);
    }).catch((err) => {console.log(err)})
}) 

app.put('/api/blogs', (req, res) => {
    console.log(req)
    req.app.get('db').updateBlogs([req.user.id, req.body.id, req.body.body]).then(blogs => {
        req.app.get('db').selectpostId([req.user.id, req.body.id, req.body.body]).then(blogs => {
            res.send()
        }) // Update request for blogs
    })
 })

 app.put('/api/users', (req, res) => {
     console.log(req.user.id)
    req.app.get('db').updateUsers([req.body.email, req.body.state, req.body.dob, req.body.username, req.user.id])   
            res.status(200).end()
    //     }) // Update request for users
    // })
 })

 app.delete('/api/blogs/:id', (req, res)  => {
    req.app.get('db').deleteBlogs([req.params.id]).then(blogs =>{
        req.app.get('db').selectpostId([req.user.id, req.body.id, req.body.body]).then(blogs => {
            res.status(200).send(blogs);
            })
        }).catch((err) => {console.log(err
    )})
})  

app.get('/api/users', (req, res) => {
    app.get('db').jointables([req.user.id])
    .then(users => {
        res.status(200).send(users);
    }).catch((err) => {console.log(err)})
})

const port = 3535;
app.listen(port, () => {console.log("Server is running on port " + 3535)})