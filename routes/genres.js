const express = require('express')
const genresController = require("../controllers/API/genre.controller")
const checkAuthMiddleware = require("../middleware/checkAuth")

const router = express.Router();
router.get("/", genresController.index)
router.post("/", checkAuthMiddleware.checkAuth, genresController.save)
router.get("/:id", genresController.show)
router.patch("/:id", checkAuthMiddleware.checkAuth, genresController.update)
router.delete("/:id", checkAuthMiddleware.checkAuth, genresController.destroy)
router.get("/search/name/:name", genresController.searchByName)
module.exports = router