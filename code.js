// Building a deck
let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
let cardNums = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
let deck = []

function createDeck(){
    let deck = []
    for (i = 0; i < cardNums.length; i++){
        for (j = 0; j < suits.length; j++){
            let weight = parseInt(cardNums[i])
            if (cardNums[i] == 'J' || cardNums[i] == 'Q' || cardNums[i] == 'K'){
                weight = 10
            }
            if (cardNums[i] == 'A'){
                weight = 11
            }
            let card = {value: cardNums[i], suit: suits[j], weight: weight}
            deck.push(card)
        }
    }
    return deck
}

console.log(createDeck())