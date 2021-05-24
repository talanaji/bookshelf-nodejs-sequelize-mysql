const Sequelize = require('sequelize');

const Validator = require('fastest-validator')
const models = require('../../models')
// List all authors ex: http://localhost:4000/authors
function index(req, res) {
    models.authors.findAll().then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No authors ",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}

// List all books for a specific author ex: http://localhost:4000/authors/books/1
function getBooks(req, res) {

    const { id } = req.params;
    models.authors_books.findAll({
        include: [{
            model: models.books,
            attributes: ['id', 'title', 'isbn', 'description']
        }
        ], where: { author_id: id }
    }).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No Books for this Author",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}
// Get a single author by ID ex: http://localhost:4000/authors/1
function show(req, res) {
    const { id } = req.params;
    models.authors.findByPk(id).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "Author not found",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}
// Search for authors by name ex: http://localhost:4000/authors/search/name/collins
function searchByName(req, res) {

    const { name } = req.params;
    models.authors.findAll({
        where: {
            name: {
                [Sequelize.Op.like]: `%${name}%`
            }

        }
    }).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "No Authors with this name",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}


function save(req, res) {
    const author = {
        name: req.body.name,
        biography: req.body.biography
    }
    const schema = {

        name: { type: "string", optional: false, max: "100" },
        biography: { type: "string", optional: false, max: "500" },
    }
    const v = new Validator();
    const validationResponse = v.validate(author, schema)
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation Failed",
            error: validationResponse
        })
    }
    models.authors.create(author).then(result => {
        res.status(201).json({
            message: "Author Created Successfully",
            author: result
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

    const updatedAuthor = {
        name: req.body.name,
        biography: req.body.biography

    }
    const schema = {
        name: { type: "string", optional: false, max: "100" },
        biography: { type: "string", optional: false, max: "500" },
    }
    const v = new Validator();
    const validationResponse = v.validate(updatedAuthor, schema)
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation Failed",
            error: validationResponse
        })
    }
    models.authors.update(updatedAuthor, { where: { id } }).then(() => {
        res.status(200).json({
            message: "Author Updated Successfully",
            author: updatedAuthor
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

    models.authors.destroy({ where: { id } }).then(() => {
        res.status(200).json({
            message: "Author Deleted Successfully",
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
    getBooks,
    searchByName
}