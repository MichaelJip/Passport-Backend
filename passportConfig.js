import { User } from "./user.js";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";

export const Passport = function (passport) {
  passport.use(
    new passportLocal.Strategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findOne({ _id: id }).exec();
      const userInformation = {
        username: user.username,
      };
      cb(null, userInformation);
    } catch (err) {
      cb(err);
    }
  });
};
