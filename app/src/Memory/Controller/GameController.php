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
        $cards = CardHelper::getCards(14);
        $context = [
            'cards' => $cards
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
        }
    }
}