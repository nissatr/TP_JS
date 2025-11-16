const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const User = require('./models/User');

const app = express();

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tp2_books', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Utilisateur non trouvé' });

    const isValid = await user.isValidPassword(password);
    if (!isValid) return done(null, false, { message: 'Mot de passe incorrect' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Middleware pour protéger les routes
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Routes
app.get('/', (req, res) => res.redirect('/login'));

// Page de registre
app.get('/register', (req, res) => res.render('register', { messages: req.flash('error') }));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    req.flash('error', 'Utilisateur déjà existant');
    res.redirect('/register');
  }
});

// Page de login
app.get('/login', (req, res) => res.render('login', { messages: req.flash('error') }));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: true
}));

// Liste des livres (protégé)
const books = [
  { title: 'Harry Potter', author: 'J.K. Rowling' },
  { title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
  { title: '1984', author: 'George Orwell' }
];

app.get('/books', isAuthenticated, (req, res) => {
  res.render('books', { user: req.user, books });
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => { res.redirect('/login'); });
});

// Start server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));