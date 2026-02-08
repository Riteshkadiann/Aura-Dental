import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .send({ error: "Email and password don't match." });
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};
const register = async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;
    const user = new User({ username: username, name: name || username || "", email, role: role || 'user' });
    user.password = password;
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    let user = null;
    if (usernameOrEmail && usernameOrEmail.includes("@")) {
      user = await User.findOne({ email: usernameOrEmail });
    } else {
      // try match by username
      user = await User.findOne({ username: usernameOrEmail });
    }
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(password)) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(401).json({ error: "Could not log in" });
  }
};
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "signed out",
  });
};
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

export default { signin, signout, register, login, requireSignin, hasAuthorization };
