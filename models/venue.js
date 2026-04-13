const { Schema } = require('mongoose');

const venueSchema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        show_poster: { type: String, required: true },
        show_time: { type: String, required: true },
        ae_needed: { type: Boolean },
        cover: { type: String, required: true },
        pay: { type: Number },
    },
    { timestamps: true },
);

module.exports = venueSchema;
