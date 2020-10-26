require('dotenv').config()
const express = require("express")
const app = express()
const path = require('path')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup')

const mysql = require("mysql")
const { read } = require("fs")
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }));


//-----------------------------------------------


//DataBase

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});  
/*
db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
} );
*/
if(!db._connectCalled ) 
{
    db.connect( (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log("MYSQL Connected...")
        }
    } );
}

//global.db = connection;


//--------------------------------------------------



//All for GOOGLE:

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

const { createConnection } = require("net")





// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
};

//GOOGLE Routes
/*
app.get('/failed', (req, res) => res.send('You Failed to log in!'));

app.get('/success', (req, res) => {
    res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value});
})


app.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);
*/

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.get('/success', (req, res) => {
    res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value});
})

app.get('/google', passport.authenticate('google', {scope:['profile', 'email']}))

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
)

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})



//--------------------------------------



app.post('/submit', function(req, res){
    console.log(req.body);

    var sql = "insert into registration values (null, '"+ req.body.name +"', '"+ req.body.email +"', '"+ req.body.status +"')";
    db.query(sql, function(err){

        if (err) throw err
        //SQL 
        res.render("student_ui");
});
    //db.end();
});


//--------------------------------

// Defining Routes:
app.use('/', require('./routes/pages'));

//--------------------------------

//Port:
app.listen(8001, () => {
    console.log("Server started on Port 8001");
});

//--------------------------------