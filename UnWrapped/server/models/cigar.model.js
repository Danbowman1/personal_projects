const mongoose = require('mongoose')

const CigarSchema = new mongoose.Schema({

    cigarName: {
        type: String,
        required: [true, "A cigar's name is required!"],
    },

    description: {
        type: String,
        required: [true, "You must provide a description of the cigar!"]
    },

    image: {
        type: String,
        required: [true, "An image of your cigar is required!"]
    },
    

}, {timestamps: true})

const Cigar = mongoose.model("Cigar", CigarSchema)
module.exports = Cigar