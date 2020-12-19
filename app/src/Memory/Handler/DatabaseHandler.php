<?php

namespace Memory\Handler;

use Medoo\Medoo;

/**
 * Instancie Medoo, une libraire permettant de faire des appels à la base de données simplifiés
 * https://medoo.in/
 *
 * Class DatabaseHandler
 * @package Memory\Handler
 */
final class DatabaseHandler
{
    private $database;

    public function setDatabase($settings)
    {
        $this->database = new Medoo($settings);
    }

    public function getDatabase()
    {
        return $this->database;
    }
}