import express from "express";
const router = express.Router();

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    req.session.user = username;
    res.send("Authenticated successfully!");
  } else {
    res.status(401).send("Invalid credentials!");
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out!");
});

export default router;
