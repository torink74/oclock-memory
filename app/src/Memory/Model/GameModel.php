<?php

namespace Memory\Model;

use Memory\Handler\DatabaseHandler;

final class GameModel
{
    private $_database;
    private $_tableName;

    public function __construct()
    {
        $databaseHandler = new DatabaseHandler();
        $settings = [
            'database_type' => 'mysql',
            'database_name' => 'memory',
            'server'        => 'db',
            'username'      => 'root',
            'password'      => ''
        ];
        $databaseHandler->setDatabase($settings);
        $this->_database = $databaseHandler->getDatabase();
        $this->_tableName = 'game';
    }

    public function registerTime($time)
    {
        $data = [
            'time'  => $time
        ];
        $this->_database->insert($this->_tableName, $data);
    }
}