// Building a deck

let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
let cardNums = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

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

// Shuffle formula
// I used this formula because it was highly reccommended for shuffling an array:
// https://github.com/Daplie/knuth-shuffle/blob/master/index.js

function shuffle(array) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex
    
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array
}

let shuffledDeck = shuffle(createDeck())
console.log(shuffledDeck)

// Creating players and hands

let users = [{
    name: 'Player',
    points: 0,
    hand: []
},{
    name: 'Dealer',
    points: 0,
    hand: []
}]

function showCard(card){
    let el = document.createElement('div');
    el.setAttribute('class', 'card')
    el.innerHTML = card.suit + ' ' + card.value;
    return el
}

function makeCard(card, player){
    let hand = document.getElementById('hand-' + player.name)
    hand.append(showCard(card))
}

const dealHand = ()=>{
    for (i=0; i < 2; i++){
        for (j=0; j < users.length; j++){
            card = shuffledDeck.pop()
            console.log(card)
            console.log(users[j])
            users[j].hand.push(card)
            console.log(users[j].hand)
            makeCard(card, users[j])
            // changePoints()
        }
    }
    // changeDeck()
}

dealHand()
console.log(users[0])
