const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String },
    ISBN: {
        type: Number,
        unique: true,
    },
    author: { type: String },
    reviews: [{
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assuming 'User' is your user model
        comment: String
    }]
}, {
  timestamps: true,
})

module.exports = mongoose.model('Book', bookSchema) 