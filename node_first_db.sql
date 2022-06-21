-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 21 juin 2022 à 13:13
-- Version du serveur : 5.7.36
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `node_first_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `pokemons`
--

DROP TABLE IF EXISTS `pokemons`;
CREATE TABLE IF NOT EXISTS `pokemons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `hp` int(11) NOT NULL,
  `cp` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `types` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Pokemons_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pokemons`
--

INSERT INTO `pokemons` (`id`, `name`, `hp`, `cp`, `picture`, `types`, `created`) VALUES
(1, 'Bulbizarre', 25, 5, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png', 'Plante,Poison', '2022-06-21 13:06:39'),
(2, 'Salamèche', 28, 6, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png', 'Feu', '2022-06-21 13:06:39'),
(3, 'Carapuce', 21, 4, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png', 'Eau', '2022-06-21 13:06:39'),
(4, 'Aspicot', 16, 2, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png', 'Insecte,Poison', '2022-06-21 13:06:39'),
(5, 'Roucool', 30, 7, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png', 'Normal,Vol', '2022-06-21 13:06:39'),
(6, 'Rattata', 18, 6, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png', 'Normal', '2022-06-21 13:06:39'),
(7, 'Piafabec', 14, 5, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png', 'Normal,Vol', '2022-06-21 13:06:39'),
(8, 'Abo', 16, 4, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png', 'Poison', '2022-06-21 13:06:39'),
(9, 'Pikachu', 21, 7, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png', 'Electrik', '2022-06-21 13:06:39'),
(10, 'Sabelette', 19, 3, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png', 'Normal', '2022-06-21 13:06:39'),
(11, 'Mélofée', 25, 5, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png', 'Fée', '2022-06-21 13:06:39'),
(12, 'Groupix', 17, 8, 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png', 'Feu', '2022-06-21 13:06:39');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'pikachu', '$2b$10$u8FJt572zF7Cx0PSBcz3Zu2wO5TqH8MuBtpEum9z3o.h04BKsIrH6', '2022-06-21 13:06:40', '2022-06-21 13:06:40');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
