const { ValidationError } = require('sequelize')
const { Pokemon } = require('../db/sequelize') // import the pokemon model
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons', auth, (req, res) => {
        const infosPokemon = req.body
        Pokemon.create(infosPokemon)
            .then(pokemon => {
                var message = `Le pokémon ${infosPokemon.name} a bien été créé !`
                res.json({message,  data: pokemon})
            })
            .catch(error => {
                if (error instanceof ValidationError)// Si l'erreur est un validate de Sequelize (ValidationError)
                {
                    return res.status(400).json({message: error.message, data: error}) // 400 = Bad Request
                }
                if (error instanceof UniqueConstraintError) // Si l'erreur est une contrainte de Sequelize (UniqueConstraintError)
                {
                    return res.status(400).json({message: error.message, data: error})
                }
                message = `Erreur ! Le pokémon ${infosPokemon.name} n'a pas été créé !`
                res.status(500).json({message, data: err}) // 500 = Internal Server Error
            })
    })
}