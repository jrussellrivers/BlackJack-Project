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

function makeCard(card){
    let el = document.createElement('div');
    el.setAttribute('class', 'card')
    el.innerHTML = card.suit + ' ' + card.value;
    return el
}

function dealCard(card, player){
    let hand = document.getElementById('hand-' + player.name)
    hand.append(makeCard(card))
}

const changePoints = (card, user)=>{
    user.points += card.weight
}

const dealHand = ()=>{
    for (i=0; i < 2; i++){
        for (j=0; j < users.length; j++){
            let card = shuffledDeck.pop()
            console.log(card)
            users[j].hand.push(card)
            dealCard(card, users[j])
            changePoints(card, users[j])
        }
    }
    // changeDeck()
}

dealHand()
console.log(users[0])
hitMe(0)
console.log(users[0])
console.log(users[1])
console.log(shuffledDeck)

// Hit Function

function hitMe(idx){
        let card = shuffledDeck.pop();
        users[idx].hand.push(card)
        dealCard(card, users[idx])
        changePoints(card, users[idx])
        check(idx)
    }

function check(idx){
    for (i=0; i < users[idx].hand.length; i++){
        if (users[idx].hand[i].value == 'A' && users[idx].points > 21){
            users[idx].points -= 10
        }
    }
    if (users[idx].points > 21){
        console.log('You lose')
    }
} 