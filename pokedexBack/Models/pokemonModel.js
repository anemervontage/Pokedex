const mongoose = require('mongoose')

const Schema = mongoose.Schema


//Schema for data required by pokemon: pokemon name, image, and description.

const pokemonSchema = new Schema({

    name: {
        type:String,
        required:true
    },
    img: {
        type:String,
        required: true
    },
    desc: {
        type:String,
        required: true
    }


}, {timestamps: true})

module.exports = mongoose.model('Pokemon', pokemonSchema)
