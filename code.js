// Building a deck
// ♠♣♥♦
// let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
let suits = ['♣', '♦', '♥', '♠']
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

let playerPoints = document.getElementById('points')
playerPoints.innerText = users[0].points
let dealerPoints = document.getElementById('points-dealer')

function makeCard(card){
    let el = document.createElement('div');
    el.setAttribute('class', 'card')
    el.innerHTML = card.suit + '<br>' + card.value;
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
            // console.log(card)
            users[j].hand.push(card)
            dealCard(card, users[j])
            changePoints(card, users[j])
            if (i == 1){
                doubleAces(j)
            }
            playerPoints.innerText = users[0].points
        }
    }
    // changeDeck()
}

// Hit Function
function playerHandScore(){
    let newScore = 0
    for (i=0; i < users[0].hand.length; i++){
        newScore += users[0].hand[i].weight
    }
    return newScore
} 

function dealerHandScore(){
    let newScore = 0
    for (i=0; i < users[1].hand.length; i++){
        newScore += users[1].hand[i].weight
    }
    return newScore
} 

function hitMe(idx){
        let card = shuffledDeck.pop();
        users[idx].hand.push(card)
        dealCard(card, users[idx])
        changePoints(card, users[idx])
        check(idx)
        playerPoints.innerText = playerHandScore()
    }

function doubleAces(idx){
    for (i=0; i < users[idx].hand.length; i++){
        if(users[idx].hand[0].value == 'A' && users[idx].hand[1].value == 'A'){
            newWeight = {weight:1}
            Object.assign(users[idx].hand[0], newWeight)
        }
    }
}

function check(idx){
    for (i=0; i < users[idx].hand.length; i++){
        if (users[idx].hand[i].value == 'A' && users[idx].points > 21){
            newWeight = {weight:1}
            Object.assign(users[idx].hand[i], newWeight)
            // users[idx].hand[i].weight === 1
            // users[idx].points -= 10 --> this caused a bug where it constantly subtracted 10
        }
    }
    if (users[idx].name == 'Player'){
        users[0].points = playerHandScore()
        playerPoints.innerText = playerHandScore()
    } else if (users[idx].name == 'Dealer'){
        users[1].points = dealerHandScore()
        dealerPoints.innerText = dealerHandScore()
    }
    if (users[idx].points > 21){
        console.log('Busted')
    }
} 

// I think Im gonna code the dealer playing here
// These console logs are gonna do things later

function dealerPlay(dealer){
    let newestScore = dealerHandScore()
    dealerPoints.innerText = newestScore
    while ( newestScore < 17){
        hitMe(1)
        newestScore = dealerHandScore()
        dealerPoints.innerText = dealerHandScore()
    }
    const score = dealer.points
    switch (true){
        case (score == 21 &&  users[0].points == 21):
            console.log('Draw')
            break
        case (score == 21 && users[0].points > 21):
            console.log('You Lose!')
            break
        case (score == 21 && users[0].points < 21):
            console.log('Dealer Blackjack! You lose!')
            break
        case (score > 21 && users[0].points > 21):
            console.log('Dealer bust. You still lose!')
            break
        case (score > 21 && users[0].points == 21):
            console.log('Dealer Busted. You got Blackjack! You Win!')
            break
        case (score > 21 && users[0].points < 21):
            console.log('Dealer bust. You win!')
            break
        case (score < 21 && users[0].points > 21):
            console.log('You busted. Dealer wins!')
            break
        case (score < 21 && users[0].points == 21):
            console.log('Blackjack! You win!')
            break
        case (score < 21 && score > users[0].points):
            console.log('Dealer wins!')
            break
        case (score < 21 && score < users[0].points):
            console.log('You win!')
            break
        case (score < 21 && score == users[0].points):
            console.log('You win!')
            break
    }
}

//// ----------------------------------------------------------------------
dealHand()
console.log(users[0])
hitMe(0)
console.log(users[0])
console.log(users[1])
dealerPlay(users[1])
console.log(shuffledDeck)