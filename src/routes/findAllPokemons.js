const { Pokemon } = require('../db/sequelize') // import the pokemon model
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if (req.query.limit) // /api/pokemons?limit=LIMIT  OU  /api/pokemons?name=NAME&limit=LIMIT
        {
            var limitation = parseInt(req.query.limit) // get the limit value from the query
        }
        else if (!req.query.limit)
        {
            limitation = 5
        }
        if (req.query.name) // /api/pokemons?name=POKEMON-NAME
        {
            const name = req.query.name // get the "name" param from the query

            if (name.length < 2) // if the name is less than 2 caracters
            {
                const message = 'Le nom du pokémon doit contenir au moins 2 caractères'
                return res.json({message})
            }
            return Pokemon.findAndCountAll({
            where : {
                name:{ //'name' est la propriété de la table 'Pokemon'
                    [Op.like]:`%${name}%`//'name' est le critère de la recherche => Opérateurs Sequelize [Op.like] = Where .. like .. 
                }                        // `%${name}%` = Contient le terme 'name'
            },
            limit:limitation, // limit the number of results to 5
            order:['name'] // order the results by name
        })
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokémon(s) qui ont ${name} dans leur nom voici les ${limitation} premiers résultats :`
                res.json({message, data:rows})
            })
        }


        else {
            Pokemon.findAll({order:['name'], limit:limitation}) // get all pokemons ordered by name
            .then(pokemons => {
                var message = 'La liste des pokemons a bien été récupérée !'
                res.json({message,  data: pokemons})
            })
            .catch(err => {
                var message = `Erreur ! La liste des pokemons n\'a pas pu être récupérée ! Veuillez réessayer plus tard`
                res.status(500).json({message, data: err})
            })
        }
    })
}