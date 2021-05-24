const Validator = require('fastest-validator')
const Sequelize = require('sequelize');
const models = require('../../models')
// List all genres ex:http://localhost:4000/genres
function index(req, res) {
    models.genres.findAll().then(result => {
        if (result.length !== 0)
            res.status(200).json(result)
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
// Get a single genre by ID ex: http://localhost:4000/genres/1
function show(req, res) {
    const { id } = req.params;
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

// Search for genres by name ex: http://localhost:4000/genres/search/name/Young
function searchByName(req, res) {

    const { name } = req.params;
    models.genres.findAll({
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
                message: "No Geners with this name",
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
            message: "Validation Failed",
            error: validationResponse
        })
    }
    models.genres.create(genre).then(result => {
        res.status(201).json({
            message: "Genre Created Successfully",
            genre: result
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
    save,
    update,
    show,
    destroy,
    searchByName
}