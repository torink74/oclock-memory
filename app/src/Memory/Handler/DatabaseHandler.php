<?php

namespace Memory\Handler;

use Medoo\Medoo;

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