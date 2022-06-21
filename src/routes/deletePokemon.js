const { Pokemon } = require('../db/sequelize') // import the pokemon model
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id).then(pokemon => {
            const pokemonDeleted = pokemon; // save the pokemon to delete
            if (pokemon == null)
            {
                var message = `Erreur ! Le pokémon n\'existe  pas !`
                return res.status(404).json({message})
            }

            return Pokemon.destroy({
                where: {id: id}
            })
            .then(_ => {
                var message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé !`
                res.json({message,  data: pokemonDeleted})
            })
            .catch(err => {
                message = 'Le pokemon n\'a pas pu être supprimé !'
                res.status(500).json({message, data: err})
            })
            })
        })
    }
