const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    console.log(req.body) // log the request body into the console (JSON FORMAT ONLY)

    User.findOne({ where: { username: req.body.username } }).then(user => { // find the user w/ given username in the DB
        if (!user){
            const message = `L'utilisateur demandé n'existe pas`
            return res.status(404).json({message})
        }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => { // compare the given password with the hashed password in the DB
        if(!isPasswordValid) {
          const message = `Le mot de passe est  incorrect`;
          return res.status(401).json({message});
        }

        // JWT
        const token = jwt.sign( // create a token with the userId
            { userId: user.id }, // payload
            privateKey, // secret
            { expiresIn: '24h' } // options
        )

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token }) // send the user and the token to the client
      })
    })
    .catch(err => {
        const message = `L'utilisateur n'a pas pu être connecté, réessayez plus tard`;
        return res.json({ message, data: err })
    })
  })
}