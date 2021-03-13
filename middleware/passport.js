require("dotenv").config()

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const userController = require("../controllers/userController");
const gitHubLogin = new GitHubStrategy(
  {
    clientID: "ea3087a2a03a4cd51279",
    clientSecret: "cef680186dd586e5692e2534008d68682eb218ab",
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  (access, refresh, profile, done) => {
    userController.findOrCreate(profile, (err, user) => {
      return done(err, user);
    });
  });
  
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);
  
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin).use(gitHubLogin);
