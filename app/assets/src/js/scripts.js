let cards = document.querySelectorAll('.card');
let previousReturnedCard = null;

/**
 * Permet d'ajouter une fonction se déclanchant au click de chaque carte du jeu
 */
function addCardListeners()
{
    cards.forEach(function (card) {
        card.addEventListener('click', handleClickOnCard);
    });
}

/**
 * Permet de retirer une fonction se déclanchant au click de chaque carte du jeu
 */
function removeCardListeners()
{
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
 * Affiche une carte durant le temps indiqué
 *
 * @param ms integer Nombre de millisecondes
 * @returns {Promise<unknown>}
 */
function displayCard(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
                    alert('BRAVO');
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

addCardListeners();