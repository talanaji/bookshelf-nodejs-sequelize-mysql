const Validator = require('fastest-validator')
const Sequelize = require('sequelize');
const models = require('../../models')

// List all books ex: http://localhost:4000/books/ 
function index(req, res) {
    models.books.findAll().then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No books ",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}

// List all authors for a specific book ex: http://localhost:4000/books/authors/9
function getAuthors(req, res) {

    const { id } = req.params;
    models.authors_books.findAll({
        include: [{
            model: models.authors,
            attributes: ['id', 'name', 'biography']
        }
        ], where: { book_id: id }
    }).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No Authors for this book",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}
// List all genres for a specific book ex: http://localhost:4000/books/genres/1
function getGenres(req, res) {

    const { id } = req.params;
    models.books_genres.findAll({
        include: [{
            model: models.genres,
            attributes: ['id', 'name']
        }
        ], where: { book_id: id }
    }).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No Genres for this book",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}
// Get a single book by ID ex: http://localhost:4000/books/1
function show(req, res) {
    const { id } = req.params;
    models.books.findByPk(id).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "Book not found",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}

// Search for books by ISBN ex: http://localhost:4000/books/search/isbn/9781408855669
function searchByISBN(req, res) {

    const { isbn } = req.params;
    models.books.findAll({
        where: { isbn }
    }).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No book with this ISBN",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}
// Search for books by title ex: http://localhost:4000/books/search/title/Where
function searchByTitle(req, res) {

    const { title } = req.params;
    models.books.findAll({
        where: {
            title: {
                [Sequelize.Op.like]: `%${title}%`
            }

        }
    }).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No book with this title",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}


function save(req, res) {
    const book = {
        title: req.body.title,
        isbn: req.body.isbn,
        description: req.body.description
    }
    const schema = {

        title: { type: "string", optional: false, max: "100" },
        isbn: { type: "string", optional: false, max: "13" },
    }
    const v = new Validator();
    const validationResponse = v.validate(book, schema)
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation Failed",
            error: validationResponse
        })
    }
    models.books.create(book).then(result => {
        res.status(201).json({
            message: "Book Created Successfully",
            book: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}



function update(req, res) {
    const { id } = req.params;

    const updatedBook = {
        title: req.body.title,
        isbn: req.body.isbn,
        description: req.body.description,

    }
    const schema = {

        title: { type: "string", optional: false, max: "100" },
        isbn: { type: "string", optional: false, max: "13" },
    }
    const v = new Validator();
    const validationResponse = v.validate(updatedBook, schema)
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation Failed",
            error: validationResponse
        })
    }
    models.books.update(updatedBook, { where: { id } }).then(() => {
        res.status(200).json({
            message: "Book Updated Successfully",
            book: updatedBook
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}

function destroy(req, res) {
    const { id } = req.params;

    models.books.destroy({ where: { id } }).then(() => {
        res.status(200).json({
            message: "Book Deleted Successfully",
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}

module.exports = {
    index,
    save,
    update,
    show,
    destroy,
    getAuthors,
    getGenres,
    searchByISBN,
    searchByTitle
}