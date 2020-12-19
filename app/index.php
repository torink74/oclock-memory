<?php

use Memory\Controller\GameController;

/* On appelle les fichiers qui ont été générés par Composer */
require __DIR__ . '/../vendor/autoload.php';

define('MEMORY_TEMPLATES_PATH', __DIR__ . '/templates/');
define('MEMORY_ASSETS_PATH', __DIR__ . '/assets/dist/');

/**
 * Permet de lire les fichiers .env et de récupérer leurs données
 * Ces fichiers permettent de mettre en place des configurations différentes en fonction de l'environnement
 * Pour plus d'informations :
 * https://github.com/vlucas/phpdotenv
 */
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

/* Initialisation du contrôleur général du jeu */
$gameController = new GameController();

/* Lancement de la partie de jeu ! */
$gameController->start();