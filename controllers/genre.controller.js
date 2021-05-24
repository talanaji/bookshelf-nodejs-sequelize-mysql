const Validator = require('fastest-validator')
const models = require('../models')

function index(req, res) {
    models.genres.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(genres => {
        if (genres.length !== 0)
            res.render("genres", { title: "Manage Genres", genres })
        else
            res.status(404).json({
                message: "No genres ",
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
    models.genres.findByPk(id).then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
        else
            res.status(404).json({
                message: "Genre not found",
            })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    });
}


function save(req, res) {
    const genre = {
        name: req.body.name,
    }
    const schema = {

        name: { type: "string", optional: false, max: "100" },
    }
    const v = new Validator();
    const validationResponse = v.validate(genre, schema)
    if (validationResponse !== true) {

        res.status(400).json({
            message: "Validation Error",
            error: validationResponse
        })
    }
    models.genres.create(genre).then(() => {
        res.status(201).json({
            message: "Genre Created Successfully",
            genre
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

    const updatedGenre = {
        name: req.body.name,
    }
    const schema = {

        name: { type: "string", optional: false, max: "100" },
    }
    const v = new Validator();
    const validationResponse = v.validate(updatedGenre, schema)
    if (validationResponse !== true) {
        res.status(400).json({
            message: "Validation Failed",
            error: validationResponse
        })
    }
    models.genres.update(updatedGenre, { where: { id } }).then(() => {
        res.status(200).json({
            message: "Genre Updated Successfully",
            genre: updatedGenre
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

    models.genres.destroy({ where: { id } }).then(() => {
        res.status(200).json({
            message: "Genre Deleted Successfully",
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