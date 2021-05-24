const express = require('express')

const checkAuthMiddleware = require("../middleware/checkAuth")
const usersController = require("../controllers/user.controller")
const booksController = require("../controllers/book.controller")
const authorsController = require("../controllers/author.controller")
const genresController = require("../controllers/genre.controller")

const router = express.Router();
router.get("/", checkAuthMiddleware.checkAuth, (req, res) => {
    res.render('index', { pageTitle: "Admin Dashboard" })
    // res.sendFile(path.join(__dirname, './views / index.html'))
})

router.get("/login", (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
    } else
        res.render('login', { pageTitle: "Login", message: "" })
})

router.post("/login", (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
    } else
        usersController.signIn(req, res)

})

// manage books routes 
router.get("/managebooks", booksController.index)
router.get("/managebooks/:id", booksController.show)
router.post("/managebooks", booksController.save)
router.put("/managebooks", booksController.update)
router.delete("/managebooks/:id", booksController.destroy)

// manage authors routes 
router.get("/manageauthors", authorsController.index)
router.get("/manageauthors/:id", authorsController.show)
router.post("/manageauthors", authorsController.save)
router.put("/manageauthors", authorsController.update)
router.delete("/manageauthors/:id", authorsController.destroy)

// manage genres  routes 
router.get("/managegenres", genresController.index)
router.get("/managegenres/:id", genresController.show)
router.post("/managegenres", genresController.save)
router.put("/managegenres", genresController.update)
router.delete("/managegenres/:id", genresController.destroy)

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect('/login')

})

// google api route 
router.get("/googlebooks", (req, res) => {
    res.render('googlebooks', { pageTitle: "Google Books ", library: [] })

});

// google api route 
router.get("/googlebooks/:search", booksController.googleBooks)

module.exports = router