const { Schema } = require('mongoose');

const adminSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        lastLogin: { type: Date, default: null },
        role: { type: String },
    },
    { timestamps: true },
);

module.exports = adminSchema;
