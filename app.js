const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- SESSION SETUP ----------------
 */

const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
const sessionStore = new MongoStore({ mongoUrl: process.env.DB_STRING, collection: 'sessions', ...dbOptions });


app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
	}
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');
// making sure that passport local finds and reloads with data everytime
app.use(passport.initialize());
//  ****(access to req.session)****
app.use(passport.session());

app.use((req, res, next) => {
	console.log(req.session);
	console.log(req.user);
	next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(5000, () => console.log('server running on port -> 5000'));