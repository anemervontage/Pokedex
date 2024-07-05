const express = require('express')
const router = express.Router()
const {
    createPokemon, 
    getPokemons,
    getPokemon,
    deletePokemon,
    updatePokemon
} = require('../Controllers/pokemonControllers')

//GET a all pokemon
router.get('/', getPokemons)

//GET a single pokemon 
router.get('/:id', getPokemon)

//POST a new pokemon
router.post('/', createPokemon)

//DELETE a single pokemon 
router.delete('/:id', deletePokemon)

//UPDATE a single pokemon 
router.patch('/:id', updatePokemon)

module.exports = router