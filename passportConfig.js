import { User } from "./user.js";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";

export const Passport = function (passport) {
  passport.use(
    new passportLocal.Strategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username }).exec();
        if (!user) return done(null, false);
        const result = await bcrypt.compare(password, user.password);
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
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
