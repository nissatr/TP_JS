import express from "express";
const router = express.Router();

// Middleware pour vérifier l'authentification
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Access denied. Please log in.");
  }
}

// Liste des livres (en mémoire)
let books = [
  { id: 1, title: "Book 1" },
  { id: 2, title: "Book 2" },
];

// Routes protégées
router.get("/", isAuthenticated, (req, res) => {
  res.json(books);
});

router.post("/", isAuthenticated, (req, res) => {
  const newBook = { id: books.length + 1, title: req.body.title };
  books.push(newBook);
  res.status(201).json(newBook);
});

export default router;
