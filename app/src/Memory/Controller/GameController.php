<?php

namespace Memory\Controller;

use Memory\Handler\TwigHandler;
use Memory\Helper\CardHelper;

final class GameController
{
    private $_twig;

    public function __construct()
    {
        $twigHandler = new TwigHandler();
        $this->_twig = $twigHandler->getEnvironment();
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
}