<?php

namespace Memory\Handler;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

final class TwigHandler
{
    private $_twig;

    public function __construct()
    {
        $loader = new FilesystemLoader(MEMORY_TEMPLATES_PATH);
        $this->_twig = new Environment($loader);

        $this->_setGlobalContext();
    }

    public function getEnvironment()
    {
        return $this->_twig;
    }

    private function _setGlobalContext()
    {
        $this->_twig->addGlobal('assetsDir', 'http://localhost/assets/dist/');
    }
}