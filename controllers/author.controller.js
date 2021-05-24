const Validator = require('fastest-validator')
const models = require('../models')

function index(req, res) {
    models.authors.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(authors => {
        if (authors.length !== 0)
            res.render("authors", { title: "Manage Authors", authors })
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


function show(req, res) {
    const { id } = req.params;
    console.log(id)
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


function save(req, res) {
    const author = {
        name: req.body.name,
        biography: req.body.biography,
    }
    const schema = {

        name: { type: "string", optional: false, max: "100" },
    }
    const v = new Validator();
    const validationResponse = v.validate(author, schema)
    if (validationResponse !== true) {

        res.status(400).json({
            message: "Validation Error",
            error: validationResponse
        })
    }
    models.authors.create(author).then(() => {
        res.status(201).json({
            message: "Author Created Successfully",
            author
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

    const updatedAuthor = {
        name: req.body.name,
        biography: req.body.biography,
    }
    const schema = {

        name: { type: "string", optional: false, max: "100" },
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
    save, show,
    update,
    destroy,
}