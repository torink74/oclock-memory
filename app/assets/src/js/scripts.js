let cards = document.querySelectorAll('.card');
let previousReturnedCard = null;

function handleClickOnCard(event) {
    let card = event.target;

    let index = card.dataset.letter;
    let letter = index.substr(0, 1);
    card.classList.remove('hide');
    if (previousReturnedCard !== null)
    {
        if (previousReturnedCard === card.dataset.letter) {
            // Tu viens de cliquer deux fois au meme endroit
            console.log("C'est la même carte");
        }
        else {
            let previousReturnedCardLetter = previousReturnedCard.substr(0, 1);
            if (letter === previousReturnedCardLetter) {
                console.log('Bravo');
            }
            else {
                console.log('Essaye encore');
            }
        }
    }

    previousReturnedCard = card.dataset.letter;
}

cards.forEach(function (card) {
    card.addEventListener('click', handleClickOnCard);
});