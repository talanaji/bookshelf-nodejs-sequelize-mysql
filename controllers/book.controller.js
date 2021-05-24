const Validator = require('fastest-validator')
const request = require('request');
const models = require('../models')

function index(req, res) {
    models.books.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(books => {
        if (books.length !== 0)
            res.render("books", { title: "Manage Books", books })
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
function googleBooks(req, res) {
    const { search } = req.params;
    request(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&key=AIzaSyBHvwwcQo_CYkfztZLauSaDEDhOhm153LM`, (error, response, body) => {
        const library = JSON.parse(body)

        if (library.length !== 0)
            res.status(200).json(library.items)

    })
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
            message: "Validation Error",
            error: validationResponse
        })
    }
    models.books.create(book).then(() => {
        res.status(201).json({
            message: "Book Created Successfully",
            book
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}



function update(req, res) {
    const { id } = req.body;

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
    save, show,
    update, googleBooks,
    destroy,
}