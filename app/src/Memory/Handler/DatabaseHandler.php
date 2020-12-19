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
    private $_database;

    public function __construct()
    {
        $settings = [
            'database_type' => 'mysql',
            'database_name' => isset($_ENV['DB_NAME']) ? $_ENV['DB_NAME'] : 'database',
            'server'        => isset($_ENV['DB_SERVER']) ? $_ENV['DB_SERVER'] : 'mysql',
            'username'      => isset($_ENV['DB_USERNAME']) ? $_ENV['DB_USERNAME'] : 'root',
            'password'      => isset($_ENV['DB_PWD']) ? $_ENV['DB_PWD'] : ''
        ];

        /**
         * Try/catch permet de savoir si une erreur s'est révélée durant l'exécution d'un script.
         * Si une erreur est présente dans le script encapsulé par "try", alors celle-ci
         * pourra être interceptée dans le "catch"
         */
        try {
            $this->_database = new Medoo($settings);
        }
        catch (\Exception $e) {
            /**
             * La configuration de la base de données via le fichier .env n'est pas bonne
             * On affiche le message d'erreur à l'utilisateur pour qu'il puisse configurer sa base
             * Etant donné que l'application ne peut pas fonctionner sans la base de données,
             * on tue l'exécution du programme à l'aide de "die"
             */

            $message = 'Il y a une erreur de configuration de votre base de données.<br/>';
            $message .= 'Veuillez vérifier votre fichier .env<br/>';
            $message .= 'Détails de l\'erreur :<br/>';
            $message .= $e->getMessage();

            echo $message;
            die;
        }
    }

    public function getDatabase()
    {
        return $this->_database;
    }
}