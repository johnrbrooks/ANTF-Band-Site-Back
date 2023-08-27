const { Schema } = require('mongoose')

const showSchema = new Schema (
    {
        venue: { type: String, required: true },
        show_poster: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        cover: { type: String, required: true }
    },
    { timestamps: true }
)

module.exports = showSchema