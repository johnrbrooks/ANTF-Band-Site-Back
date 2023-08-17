const { ContactForm } = require('../models')

const getAllForms = async (req, res) => {
    try {
        let forms = await ContactForm.find();
        res.json(forms)
    } catch (error) {
        res.send(error)
    }
}

const createForm = async (req, res) => {
    try {
        let newForm = await ContactForm.create({
            name: req.body.name,
            email: req.body.email,
            reference: req.body.reference,
            message: req.body.message
        })
        res.send(newForm)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAllForms,
    createForm
}