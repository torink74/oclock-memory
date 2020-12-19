let cards = document.querySelectorAll('.card');
let previousReturnedCard = null;

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

function handleCardAction(card)
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
                 * Les deux cartes retournées ne correspondent pas, on retourne cette carte
                 * et la carte précédente face cachée
                 */
                card.classList.add('hide');
                previousReturnedCard.classList.add('hide');
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

function handleClickOnCard(event) {
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

cards.forEach(function (card) {
    card.addEventListener('click', handleClickOnCard);
});