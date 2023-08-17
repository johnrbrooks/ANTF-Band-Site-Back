const { Schema } = require('mongoose')

const contactFormSchema = new Schema (
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        reference: { type: String, required: true },
        message: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = contactFormSchema