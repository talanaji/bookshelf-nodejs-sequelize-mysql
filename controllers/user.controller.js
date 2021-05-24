const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const models = require('../models')

function signUp(req, res) {
    models.User.findOne({ where: { email: req.body.email } })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Email already exist",
                })
            } else {
                bcryptjs.genSalt(10, (err, salt) => {
                    if (err) res.send(err)
                    bcryptjs.hash(req.body.password, salt, (_err, hash) => {
                        if (err) res.send(err)
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        }
                        models.User.create(user).then(() => {
                            res.status(201).json({
                                message: "User Registered Successfully",
                            })
                        }).catch(() => {
                            res.status(500).json({
                                message: "Something went wrong",
                            })
                        });
                    })
                })
            }

        }).catch(() => {
            res.status(500).json({
                message: "Something went wrong",
            })
        });



}
function signIn(req, res) {

    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                bcryptjs.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        jwt.sign({
                            email: user.email,
                            userId: user.id,
                        }, "secret", (_err, tkn) => {
                            res.cookie('token', tkn, {
                                maxAge: 3600000, // Lifetime
                            })


                            /* 
                                                        res.status(201).json({
                                                            message: "Authentication Successfully",
                                                            token: tkn
                                                        })
                             */
                            return res.redirect('/')
                        })
                    } else {
                        // res.status(409).json({
                        //     message: "Invalid credientials",
                        // })

                        res.render("login", {
                            pageTitle: "Login",
                            message: "Invalid credientials",
                        })
                    }
                })
            } else {

                res.render("login", {
                    pageTitle: "Login",
                    message: "Invalid credientials",
                })
            }

        }).catch(() => {
            res.status(500).json({
                message: "Something went wrong",
            })
        });



}
module.exports = {
    signUp,
    signIn
}