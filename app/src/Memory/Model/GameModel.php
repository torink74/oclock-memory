<?php

namespace Memory\Model;

use Memory\Handler\DatabaseHandler;

/**
 * Gère les données de la table "game"
 *
 * Class GameModel
 * @package Memory\Model
 */
final class GameModel
{
    private $_database;
    private $_tableName;

    public function __construct()
    {
        /**
         * Paramétrage de l'accès à la base de données
         */
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

    /**
     * Enregistre un temps dans la base de données
     *
     * @param $time integer temps en millisecondes
     */
    public function registerTime($time)
    {
        $data = [
            'time'  => $time
        ];
        $this->_database->insert($this->_tableName, $data);
    }

    /**
     * Retrouve les meilleurs temps enregistrés
     *
     * @param $limit integer Nombre de temps à retourner
     * @return array
     */
    public function getHighscores($limit)
    {
        $where = [
            'ORDER' => [
                'time'  => 'ASC'
            ],
            'LIMIT' => $limit
        ];
        $highscores = $this->_database->select($this->_tableName, 'time', $where);

        return $highscores;
    }
}