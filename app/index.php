<?php

use Memory\Controller\GameController;

/* On appelle les fichiers qui ont été générés par Composer */
require __DIR__ . '/../vendor/autoload.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

define('MEMORY_TEMPLATES_PATH', __DIR__ . '/templates/');
define('MEMORY_ASSETS_PATH', __DIR__ . '/assets/dist/');

/* Initialisation du contrôleur général du jeu */
$gameController = new GameController();

/* Lancement de la partie de jeu ! */
$gameController->start();