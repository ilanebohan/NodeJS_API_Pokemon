const { Pokemon } = require('../db/sequelize') // import the pokemon model
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        const infosPokemon = req.body
        Pokemon.update(infosPokemon, {
            where: {id: id}
        })
        .then(_ => {
            Pokemon.findbyPK(id).then(pokemon => {
                if (pokemon == null)
                {
                    var message = `Erreur ! Le pokémon n\'existe  pas !`
                    return res.status(404).json({message})
                }
                var message = `Le pokémon ${infosPokemon.name} a bien été modifié !`
                res.json({message,  data: pokemon})
            })
            .catch(err => {
                message = 'Le pokemon n\'a pas pu être récupéré !'
                res.status(500).json({message, data: err})
            })
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
            message = 'Le pokemon n\'a pas pu être récupéré !'
            res.status(500).json({message, data: err})
         })
    })
}