let previousReturnedCard = null;
let progressBar = document.getElementById('progress-bar');
let gameSettings = document.getElementById('game-settings');
let startTime = null;

function addGameListeners()
{
    gameSettings.addEventListener('submit', gameLoop);
}

/**
 * Permet d'ajouter une fonction se déclanchant au click de chaque carte du jeu
 */
function addCardListeners()
{
    let cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
        card.addEventListener('click', handleClickOnCard);
    });
}

/**
 * Permet de retirer une fonction se déclanchant au click de chaque carte du jeu
 */
function removeCardListeners()
{
    let cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
        card.removeEventListener('click', handleClickOnCard);
    });
}

/**
 * Vérifie si la partie est terminée et que le joueur a gagné
 * @returns {boolean} True si le joueur a gagné
 */
function isGameWon()
{
    let cardsToFind = document.querySelectorAll('.hide');

    /**
     * Les cartes possédant la classe hide sont celles qui n'ont pas encore trouvé leur paire
     */
    if (cardsToFind.length > 0) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * La partie est perdue
 */
function gameOver()
{
    alert("Aie, tu n'as pas été assez rapide ! Essayes de modifier le temps de ta partie !");
}

/**
 * Affiche une carte durant le temps indiqué
 * Pour en savoir plus sur les promises :
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
 *
 * @param ms integer Nombre de millisecondes
 * @returns {Promise<unknown>}
 */
function displayCard(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gère les différentes actions lorsqu'une carte est retournée.
 * Fonction asynchrone afin de pouvoir attendre le retour d'une promise
 * pour afficher la deuxième carte retournée durant un laps de temps donné
 *
 * Pour plus d'informations :
 * https://www.sitepoint.com/delay-sleep-pause-wait/
 *
 * @param card element HTMl
 */
async function handleCardAction(card)
{
    /**
     * On affiche la carte
     */
    card.classList.remove('hide');
    if (previousReturnedCard !== null)
    {
        if (previousReturnedCard.dataset.letter === card.dataset.letter) {
            /**
             * La même carte a été cliqué deux fois de suite.
             * On la retourne face cachée et on réinitialise la valeur de la carte précédente
             */
            previousReturnedCard = null;
            card.classList.add('hide');
        }
        else {
            /**
             * On récupère les lettres correspondantes aux deux cartes retournées
             * Deux cartes possédant la même lettre signifie qu'elles font parti de la même paire
             */
            let index = card.dataset.letter;
            let letter = index.substr(0, 1);
            let previousReturnedCardIndex = previousReturnedCard.dataset.letter;
            let previousReturnedCardLetter = previousReturnedCardIndex.substr(0, 1);
            if (letter === previousReturnedCardLetter)
            {
                /**
                 * Les deux cartes retournées correspondent, on valide la paire et
                 * on vérifie si la partie est gagnée
                 */
                card.classList.add('found');
                previousReturnedCard.classList.add('found');
                if (isGameWon()) {
                    /**
                     * On stoppe le timer
                     */
                    progressBar.style.animationPlayState = 'paused';

                    /**
                     * On calcule le temps qu'a pris le joueur pour gagner
                     */
                    let endTime = new Date().getTime();
                    let time = endTime - startTime;

                    /**
                     * On enregistre le temps en base de données
                     */
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState === 4 && this.status === 200) {
                            alert("Bravo champion ! Essayes de modifier la durée de la partie pour plus de challenge !");

                            /* On affiche les nouveaux highscores */
                            document.getElementById('game-board').innerHTML = this.response;
                        }
                    };
                    xmlhttp.open("POST", "", true);
                    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlhttp.send("time=" + time);
                }
            }
            else {
                /**
                 * Les deux cartes retournées ne correspondent pas, on affiche cette carte
                 * pendant 2 secondes puis on la retourne avec la carte précédente face cachée.
                 * On retire les listeners sur les cartes pour ne pas que le joueur puisse jouer à nouveau
                 * avant que les cartes ne se retournent
                 */
                removeCardListeners();
                await displayCard(2000);
                card.classList.add('hide');
                previousReturnedCard.classList.add('hide');

                /**
                 * On réactive les listeners pour les cartes
                 */
                addCardListeners();
            }

            /**
             * On réinitialise la valeur de la carte précédente
             * car nous devons jouer avec deux autres cartes
             */
            previousReturnedCard = null;
        }
    }
    else {
        /**
         * On stocke la valeur de notre première carte retournée
         */
        previousReturnedCard = card;
    }
}

function handleClickOnCard(event)
{
    let card = event.target;

    /**
     * On vérifie si la carte cliquée ne fait pas partie d'une paire déjà trouvée
     */
    if (card.classList.contains('found')) {
        /**
         * La carte a déjà été trouvée, on ne fait rien
         */
    }
    else {
        /**
         * On exécute les actions possibles avec cette carte
         */
        handleCardAction(card);
    }
}

/**
 * Lance une partie
 */
function gameLoop(event)
{
    event.preventDefault();

    /**
     * On retire les highscores en vérifiant si l'élément est toujours présent sur la page
     */
    let scores = document.getElementById('scores');
    if (scores !== null) {
        scores.remove();
    }

    /**
     * On distribue de nouvelles cartes
     * Utilisation d'Ajax pour charger les données sans recharger la page
     */
    let xmlhttp = new XMLHttpRequest();
    /**
     * Premier paramètre : type de méthode (POST/GET)
     * Utilisation de POST pour soumettre les données au serveur via un formulaire post
     * Deuxième paramètre : url du fichier à appeler
     * Nous ne mettons pas d'url car le jeu se situe sur la page d'accueil, le fichier n'a donc pas
     * d'url spécifique
     * Troisième paramètre : appel asynchrone ou non
     * La meilleure pratique est de le laisser à true
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
     */
    xmlhttp.open("POST", "", true);
    /**
     * Nécessaire pour envoyer correctement les données post au serveur
     */
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    /**
     * Envoie des données via le formulaire (post)
     */
    xmlhttp.send("new-game=1");

    /**
     * Insertion des cartes dans le container 'game-board' suite à l'appel Ajax réussi
     */
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('game-board').innerHTML = this.response;
            addCardListeners();
        }
    };

    /**
     * On initialise la date de début de la partie
     */
    startTime = new Date().getTime();

    /**
     * Recommence l'animation du timer
     */
    progressBar.style.animation = 'none';
    // Permet d'appliquer les changements de l'animation en exécutant le reflow
    // Pour plus d'informations sur le reflow :
    // https://sites.google.com/site/getsnippet/javascript/dom/repaints-and-reflows-manipulating-the-dom-responsibly
    progressBar.offsetHeight;
    progressBar.style.animation = 'progressbar-countdown';

    /**
     * On lance le timer en récupérant la valeur spécifiée dans les options du jeu
     */
    let time = document.getElementById('time').value;
    progressBar.style.animationDuration = time + 's';
    progressBar.style.animationPlayState = 'running';
}

/**
 * Evènement lorsque le timer est écoulé
 */
progressBar.addEventListener('animationend', gameOver);

addGameListeners();