import express from "express";
import session from "express-session";
import booksRouter from "./routes/books.js";
import authRouter from "./routes/auth.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/auth", authRouter);
app.use("/books", booksRouter);

// Lancement du serveur
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
