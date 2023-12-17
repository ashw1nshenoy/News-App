const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const path=require('path')
const flash = require('connect-flash');


const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Use middleware for session
app.use(
  session({
    secret: 'hi',
    resave: false,
    saveUninitialized: false,
  })
);


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Configure Passport to use local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    // Replace this with your SQLite database logic
    const db = new sqlite3.Database('credentials.db');

    db.get('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (!row) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      return done(null, row);
    });

    db.close();
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  // Replace this with your SQLite database logic
  const db = new sqlite3.Database('credentials.db');

  db.get('SELECT * FROM credentials WHERE username = ?', [username], (err, row) => {
    done(err, row);
  });

  db.close();
});

// Set up routes
app.get('/home', (req, res) => {
 res.render('home')
});

app.get('/login', (req, res) => {
  res.render('login');
});

// Passport middleware to authenticate
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
