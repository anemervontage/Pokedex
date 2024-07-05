const Pokemon = require('../Models/pokemonModel')
const mongoose = require('mongoose')

// get all pokemon
const getPokemons = async (req, res) => {
    const pokemons = await Pokemon.find({}).sort({createdAt: -1})

    res.status(200).json(pokemons)
}

// get a single pokemon/blog
const getPokemon = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such pokemon'})
    }
    
    const pokemon = await Pokemon.findById(id)

    if (!pokemon){
        return res.status(404).json({error: 'no such pokemon'})
    }

    res.status(200).json(pokemon)
}

// create new pokemon
const createPokemon = async (req, res) => {
    const {name,img,desc} = req.body

    //add doc to DB
    try{ 
        const pokemon = await Pokemon.create({name, img, desc})
        res.status(200).json(pokemon)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete a pokemon
const deletePokemon = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such pokemon'})
    }

    const pokemon = await Pokemon.findOneAndDelete({_id: id})

    if (!pokemon){
        return res.status(400).json({error: 'no such pokemon'})
    }

    res.status(200).json(pokemon)
}



// update a pokemon
const updatePokemon = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such pokemon'})
    }

    const pokemon = await Pokemon.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!pokemon){
        return res.status(400).json({error: 'no such pokemon'})
    }

    res.status(200).json(pokemon)
}

// export functions
module.exports = {
    createPokemon,
    getPokemons,
    getPokemon,
    deletePokemon,
    updatePokemon

}