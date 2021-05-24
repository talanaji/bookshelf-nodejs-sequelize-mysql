const express = require('express')
const booksController = require("../controllers/API/book.controller")
const checkAuthMiddleware = require("../middleware/checkAuth")

const router = express.Router();
router.get("/", booksController.index)
router.post("/", checkAuthMiddleware.checkAuth, booksController.save)
router.get("/:id", booksController.show)
router.get("/authors/:id", booksController.getAuthors)
router.get("/genres/:id", booksController.getGenres)
router.get("/search/isbn/:isbn", booksController.searchByISBN)
router.get("/search/title/:title", booksController.searchByTitle)
router.patch("/:id", checkAuthMiddleware.checkAuth, booksController.update)
router.delete("/:id", checkAuthMiddleware.checkAuth, booksController.destroy)
module.exports = router