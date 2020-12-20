<?php

namespace Memory\Helper;

final class CardHelper
{
    /**
     * Distribue un jeu de cartes mélangé
     *
     * @param $number integer Nombre de cartes uniques à retourner
     * @return array de cartes
     */
    public static function getCards($number)
    {
        /**
         * On récupère un jeu de cartes uniques
         */
        $uniqueCards = self::getUniqueCards($number);

        /**
         * On duplique ces cartes pour construire des paires
         */
        $allCards = [];
        foreach ($uniqueCards as $key => $value)
        {
            /**
             * Afin de pouvoir identifier les paires, nous suivrons la convention de nommage suivante :
             * Lettre de la carte unique - Numéro de la carte
             * Ce qui donnera ces résultats :
             * a-1 / a-2
             * f-1 / f-2
             */
            $card1 = $key . '-1';
            $card2 = $key . '-2';
            $allCards[$card1] = $value;
            $allCards[$card2] = $value;
        }

        /**
         * On retourne un jeu de cartes complétement mélangé
         */
        $allCards = self::shuffleCards($allCards);

        return $allCards;
    }

    /**
     * Retourne un jeu de cartes unique mélangés
     * @param $number integer Le nombre de cartes uniques que l'on souhaite
     */
    public static function getUniqueCards($number)
    {
        /**
         * Poule de cartes uniques dont nous disposons, avec la position en hauteur
         * de l'image correspondante
         */
        $availableCards = [
            'a' => 0,
            'b' => 100,
            'c' => 200,
            'd' => 300,
            'e' => 400,
            'f' => 500,
            'g' => 600,
            'h' => 700,
            'i' => 800,
            'j' => 900,
            'k' => 1000,
            'l' => 1100,
            'm' => 1200,
            'n' => 1300,
            'o' => 1400,
            'p' => 1500,
            'q' => 1600,
            'r' => 1700
        ];

        /**
         * On mélange les cartes pour ne pas toujours utiliser les mêmes
         *
         * La fonction shuffle de PHP ne permet pas de mélanger un tableau en gardant
         * l'association entre les clés et les valeurs
         */
        $availableCards = self::shuffleCards($availableCards);

        /**
         * Si on demande un nombre de cartes trop grand, le croupier ne pourra que
         * nous donner toutes les cartes qu'il possède
         */
        if ($number > count($availableCards)) {
            $number = count($availableCards);
        }

        /**
         * Le croupier nous fourni le nombre de cartes uniques demandé
         * Etant donné que le tableau est mélangé, les cartes entre 0 et $number ne sont jamais les mêmes
         */
        $uniqueCards = array_slice($availableCards, 0, $number);

        return $uniqueCards;
    }

    /**
     * Permet de mélanger le tableau de cartes en gardant l'association clé => valeur du tableau
     * @param $cards array Cartes que l'on souhaite mélanger
     * @return array
     */
    private static function shuffleCards($cards)
    {
        /* On mélange d'abord les clés du tableau */
        $keys = array_keys($cards);
        shuffle($keys);

        /**
         * On construit le nouveau tableau en parcourant les clés qui ont été mélangées
         * Il nous suffit de récupérer la valeur de chaque clé via le tableau fourni
         * en argument de la fonction
         */
        $shuffledCards = [];
        foreach($keys as $key)
        {
            $cardValue = $cards[$key];
            $shuffledCards[$key] = $cardValue;
        }

        return $shuffledCards;
    }
}