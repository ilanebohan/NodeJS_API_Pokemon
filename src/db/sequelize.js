const { Sequelize, DataTypes } = require('sequelize'); // import sequelize and datatypes
const PokemonModel = require('../models/pokemon')// import the pokemon model
const UserModel = require('../models/user')// import the user model
let pokemons =require('./mock-pokemon') // import pokemons
const bcrypt = require('bcrypt')  // import bcrypt



const sequelize = new Sequelize('node_first_db', 'root', '', { // create a sequelize instance (connect to DB)
    dialect: "mysql",
    host: "localhost"
});

const Pokemon = PokemonModel(sequelize, DataTypes) // create a new pokemon model (1 model = 1 table)
const User = UserModel(sequelize, DataTypes) // create a new user model (1 model = 1 table)

const initDB = () => {
    sequelize.sync({force:  true}) // create the table if it doesn't exist
    .then(_ => {
        pokemons.forEach(pokemon => {
            Pokemon.create({
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        });
    bcrypt.hash('pikachu', 10).then(hash => { // hash the password
        User.create({
            username: 'pikachu',
            password: hash // set the password as the hashed one
        })
        .then(user => console.log(user.toJSON())) // log the user into the console
    })
        


        console.log('La base de données a bien été synchronisée.')
    })
    .catch(err => console.error('Une erreur est survenue lors de la synchronisation de la base de données.', err));
}


module.exports = {
    initDB, Pokemon, User
}

