var typesAutorises = ['Plante', 'Feu', 'Eau', 'Vent', 'Roche', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol']

module.exports = (sequelize, DataTypes) => { // export the pokemon model with sequelize and DataTypes
    return sequelize.define('Pokemon', { // create a new pokemon model (1 model = 1 table)
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{ // Validation sequelize
          notNull: {msg: 'Le nom du pokémon est obligatoire'},
          notEmpty: {msg: 'Le nom du pokémon ne doit pas être vide'},
        },
        unique:{ // Contrainte Sequelize
          msg: 'Le nom est déjà pris',
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{// validate the hp value when the API is called
          isInt :{msg : 'Utilisez uniquement des nombres entier pour les points de vie'}, // check if the value is an integer
          notNull: {msg: 'Les points de vie ne peuvent pas être null'}, // check if the value is not null
          min: {
            args: [0],
             msg: 'Les points de vie ne peuvent pas être négatif' // check if the value is not negative
            }, 
          max: {
            args: [999],
             msg: `Les points de vie ne peuvent pas être supérieurs à 999` // check if the value is not greater than 100
            } 
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt :{msg : 'Utilisez uniquement des nombres entier pour les points de combat'}, // check if the value is an integer
          notNull: {msg: 'Les points de combat ne peuvent pas être null'}, // check if the value is not null
          min: {
            args: [0],
             msg: 'Les points de combat ne peuvent pas être négatif'  // check if the value is not negative
            }, 
          max: {
            args: [999],
             msg: `Les points de combat ne peuvent pas être supérieurs à 999`// check if the value is not greater than 100
            } 
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{// validate the picture value when the API is called
          isUrl: {msg: 'Utilisez une URL valide'},  // check if the value is a valid URL
          notNull: {msg: 'L\'URL de l\'image ne peut pas être null'}, // check if the value is not null
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get (){ // Getter : Base de données -> API Rest
          return this.getDataValue('types').split(',') // ["Plante", "Poison"]
        },
        set(types) {// Setter : API Rest -> Base de données
          this.setDataValue('types', types.join()) // "Plante, Poison"
        },
        validate:{
          isTypesValid(value) {// Create your own validator
            if (!value)
            {
              throw new Error('Le type du pokémon est obligatoire')
            }
            if (value.split(',').length > 3)
            {
              throw new Error('Un pokémon ne peut pas avoir plus de trois types')
            }
            value.split(',').forEach(type => {
              if (!typesAutorises.includes(type)) // Si le type n'est pas dans la liste des types autorisés
              {
                throw new Error(`Le type ${type} n\'est pas autorisé`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }