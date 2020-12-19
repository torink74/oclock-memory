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
        $twigHandler = new TwigHandler();
        $this->_twig = $twigHandler->getEnvironment();

        $this->_handleAjaxRequests();
    }

    /**
     * Lancement du jeu Memory
     */
    public function start()
    {
        /**
         * Récupération des meilleurs temps en millisecondes
         */
        $gameModel = new GameModel();
        $scoresMilliseconds = $gameModel->getHighscores(5);

        /**
         * Transformation des temps en millisecondes vers un format lisible par un humain
         * La fonction array_map permet d'appliquer une fonction sur chaque élément d'un tableau
         */
        $highscores = array_map('\Memory\Helper\TimeHelper::formatMilliseconds', $scoresMilliseconds);

        $context = [
            'scores'    => $highscores
        ];

        echo $this->_twig->render('game.twig', $context);
    }

    public function registerWin($time)
    {
        $gameModel = new GameModel();
        $gameModel->registerTime($time);
    }

    private function _handleAjaxRequests()
    {
        if (isset($_POST['time'])) {
            $time = (int)$_POST['time'];
            $this->registerWin($time);
            exit;
        }

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
}