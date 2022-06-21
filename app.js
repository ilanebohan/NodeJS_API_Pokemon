const express = require('express') // import express
const favicon = require('serve-favicon') // import serve-favicon -> set a favicon
const bodyparser = require('body-parser') // import bodyparser -> parse String to JSON
const sequelize =  require('./src/db/sequelize')    // import sequelize

const app = express() // create express app
const port =  process.env.PORT || 3000 // set port | local : 3000 | heroku : process.env.PORT



app
.use(favicon(__dirname + '/favicon.ico')) // set favicon using  middleware
.use(bodyparser.json()) // set bodyparser middleware to parse JSON


sequelize.initDB() // initialisation de la DB

app.get('/', (req, res) => {
    res.json('Hello, Heroku !')
})

// Futurs points de terminaisons (endpoints) :

require('./src/routes/findAllPokemons')(app) // import findAllPokemons.js and set it as a endpoint -> need JWT Token (Authorization : Bearer <token>)
require('./src/routes/findPokemonsbyPK')(app) // import findPokemonsbyPK.js and set it as a endpoint -> need JWT Token (Authorization : Bearer <token>)
require('./src/routes/createPokemon')(app) // import createPokemon.js and set it as a endpoint -> need JWT Token (Authorization : Bearer <token>)
require('./src/routes/updatePokemon')(app) // import updatePokemon.js and set it as a endpoint -> need JWT Token (Authorization : Bearer <token>)
require('./src/routes/deletePokemon')(app) // import deletePokemon.js and set it as a endpoint -> need JWT Token (Authorization : Bearer <token>)
require('./src/routes/login')(app) // import login.js and set it as a endpoint -> login endpoint so no need for JWT Token ==> Send body in JSON format

// On ajoute la gestion des erreurs 404 : 
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
    res.status(404).json({message})
}) 

app.listen(port, () => console.log(`NodeJS Application started on : http://localhost:${port}`))  // listen on port 3000 an start app






















/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- 
---------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------  EXEMPLES DE ENDPOINTS AVEC UNE LISTE STATIC ---------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/* MIDDLEWARE CREATION 

const logger = (req,res,next) => { // create a logger middleware
    console.log(`URL : ${req.url}`) // log the url
    next() // call next to continue the flow
}

app.use(logger)  

*/
/*
app.get('/', (req,res) => res.send('Hello again Express !')) // set route GET to '/' and send 'Hello again Express !'


/*
app.get('/api/pokemons', (req,res) =>  { // set route GET to '/api/pokemons' to get all pokemons in json format
    message =""
    if (pokemons !== undefined) // if 'pokemons' array is not empty
    {
        var message = "Pokémons trouvés !" // set message to "Pokémons trouvés !" in successful case
    }
    else 
    {
        var message = "Erreur ! Aucun pokémons n'a été trouvé !" // set message to "Erreur ! Aucun pokémons n'a été trouvé !" in unsuccessful case
    }
    res.json(success(message,pokemons)) // send 'pokemon' array in json format
})



app.get('/api/pokemons/:id', (req,res) => { // set route GET to '/api/pokemons/:id' ':id' = const id
    const id = req.params.id // get id from url
    const pokemon = pokemons.find(pokemon => pokemon.id == id) // find in 'pokemon' array the one with id = id and put it in "pokemon" variable
    if (pokemon != undefined)
    {
        var message = "Un pokemon a été trouvé !" // set message to "Un pokemon a été trouvé !" in successful case
    }
    else 
    {
        var message = "Un pokemon a été trouvé !" // set message to "Un pokemon a été trouvé !" in successful case
    }
    res.json(success(message,pokemon)) // send pokemon in json format with the success msg
})

app.get('/api/pokemons/nb/length', (req,res) => { // set route GET to '/api/pokemons/nb/length'
    const nbPokemons = pokemons.length // get length of 'pokemon' array
    res.send(`There is ${nbPokemons} pokemons in the Pokedex`) // send 'nbPokemons' INTEGER
})



app.post('/api/pokemons' , (req,res) =>{ // Insert a new pokemon in the 'pokemons' array
    const id = getUniqueID(pokemons) // get unique id from 'pokemons' array
    const pokemonCreated= {...req.body, ...{id: id, created: new Date()}}// create a new pokemon with the id and the date and body content (has to be send in JSON format)
    pokemons.push(pokemonCreated) // add the new pokemon in the 'pokemons' array
    var message = `Le pokémon ${pokemonCreated.name} a été créé !`
    res.json(success(message,pokemonCreated))
})

app.put('/api/pokemons/:id' , (req,res) => { // Update a pokemon in the 'pokemons' array
    const id = req.params.id
    const pokemonUpdated =  {...req.body, id: id} // Select the pokemon with the id and the body content (has to be send in JSON format)
    pokemons = pokemons.map(pokemon => {
        return pokemon.id == id ? pokemonUpdated : pokemon // if the pokemon id is the same as the id in the url, replace the pokemon with the new one
    })
    var message = `Le pokémon ${pokemonUpdated.name} a été modifié`
    res.json(success(message,pokemonUpdated))
})

app.delete('/api/pokemons/:id' , (req,res) => {
    const id = req.params.id
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id == id) // Select the pokemon with the id
    pokemons.filter(pokemon => pokemon.id != id) // filter the pokemon with the id
    var message = `Le pokémon ${pokemonDeleted.name} a été supprimé`
    res.json(success(message,pokemonDeleted))
})

*/