const { Pokemon } = require('../db/sequelize') // import the pokemon model
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (pokemon == null)
                {
                    var message = `Erreur ! Le pokémon n\'existe  pas !`
                    return res.status(404).json({message})
                }
                message = 'Le pokémon a bien été récupéré !'
                res.json({message,  data: pokemon})
            })
             .catch(err => {
                message = 'Le pokemon n\'a pas pu être récupéré !'
                res.status(500).json({message, data: err})
             })
    })
}