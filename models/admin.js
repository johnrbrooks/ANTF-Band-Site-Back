const { Schema } = require('mongoose')

const adminSchema = new Schema (
    {
        email: { type: String, required: true},
        password: { type: String, required: true}
    },
    { timestamps: true }
)

module.exports = adminSchema