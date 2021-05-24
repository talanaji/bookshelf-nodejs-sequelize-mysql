const express = require('express')
const authorsController = require("../controllers/API/author.controller")
const checkAuthMiddleware = require("../middleware/checkAuth")

const router = express.Router();
router.get("/", authorsController.index)
router.post("/", checkAuthMiddleware.checkAuth, authorsController.save)
router.get("/:id", authorsController.show)
router.get("/books/:id", authorsController.getBooks)
router.get("/search/name/:name", authorsController.searchByName)
router.patch("/:id", checkAuthMiddleware.checkAuth, authorsController.update)
router.delete("/:id", checkAuthMiddleware.checkAuth, authorsController.destroy)
module.exports = router