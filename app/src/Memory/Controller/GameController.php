<?php

namespace Memory\Controller;

use Memory\Handler\TwigHandler;
use Memory\Helper\CardHelper;
use Memory\Model\GameModel;

final class GameController
{
    private $_twig;

    public function __construct()
    {
        /**
         * Initialise Twig, le moteur de templating
         * https://twig.symfony.com/
         */
        $twigHandler = new TwigHandler();
        $this->_twig = $twigHandler->getEnvironment();

        $this->_handleAjaxRequests();
    }

    /**
     * Lancement du jeu Memory
     */
    public function start()
    {
        /* Récupération des 5 meilleurs temps */
        $highscores = $this->_getHighscores(5);

        /* Definit la variable "score" dans twig, contenant la valeur de $highscores */
        $context = [
            'scores'    => $highscores
        ];

        /* Affiche le twig */
        echo $this->_twig->render('game.twig', $context);
    }

    private function _handleAjaxRequests()
    {
        /* Le joueur a terminé la partie */
        if (isset($_POST['game-over']) && $_POST['game-over'] == 1) {

            $time = isset($_POST['time']) ? (int)$_POST['time'] : null;
            /* Si un temps est transmis, le joueur a gagné */
            if ($time !== null) {
                $this->_registerWin($time);
            }

            /* Récupération des 5 meilleurs temps */
            $highscores = $this->_getHighscores(5);
            $context = [
                'scores'    => $highscores
            ];

            $html = $this->_twig->render('components/game/highscore.twig', $context);
            echo $html;
            exit;
        }

        /* Le joueur a lancé une nouvelle partie */
        if (isset($_POST['new-game']) && $_POST['new-game'] == 1) {
            $cards = CardHelper::getCards(14);
            $context = [
                'cards' => $cards
            ];

            $html = $this->_twig->render('components/game/cards.twig', $context);
            echo $html;
            exit;
        }
    }

    /**
     * Fourni les meilleurs temps
     *
     * @param $limit integer nombre de temps à récupérer
     * @return array des meilleurs temps
     */
    private function _getHighscores($limit)
    {
        /**
         * Récupération des meilleurs temps en millisecondes
         */
        $gameModel = new GameModel();
        $scoresMilliseconds = $gameModel->getHighscores($limit);

        /**
         * Transformation des temps en millisecondes vers un format lisible par un humain
         * La fonction array_map permet d'appliquer une fonction sur chaque élément d'un tableau
         */
        $highscores = array_map('\Memory\Helper\TimeHelper::formatMilliseconds', $scoresMilliseconds);

        return $highscores;
    }

    /**
     * Enregistre le temps qu'a mis le joueur pour gagner
     *
     * @param $time
     */
    private function _registerWin($time)
    {
        $gameModel = new GameModel();
        $gameModel->registerTime($time);
    }
}