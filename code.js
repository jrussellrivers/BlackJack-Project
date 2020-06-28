// Building a deck

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
// let shuffledDeck2 = shuffle(createDeck())
// let shuffledDeck3 = shuffle(createDeck())
// let shuffledDeck4 = shuffle(createDeck())
// let shuffledDeck5 = shuffle(createDeck())
// Array.prototype.push.apply(shuffledDeck,shuffledDeck2)
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
    win.innerText = ''
    message.innerText = ''
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
            dealerPoints.innerText = users[1].points
            playerPoints.innerText = users[0].points
        }
    }
    changeDeck()
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
        changeDeck()
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
        message.innerText = 'Busted'
    }
} 

// I think Im gonna code the dealer playing here
// These console logs are gonna do things later

function dealerPlay(dealer){
    let win = document.getElementById('win')
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
            win.innerText = 'Draw'
            break
        case (score == 21 && users[0].points > 21):
            win.innerText = 'You Lose!'
            break
        case (score == 21 && users[0].points < 21):
            win.innerText = 'Dealer Blackjack! You lose!'
            break
        case (score > 21 && users[0].points > 21):
            win.innerText = 'Dealer bust. You still lose!'
            break
        case (score > 21 && users[0].points == 21):
            win.innerText = 'Dealer Busted. You got Blackjack! You Win!'
            break
        case (score > 21 && users[0].points < 21):
            win.innerText = 'Dealer bust. You win!'
            break
        case (score < 21 && users[0].points > 21):
            win.innerText = 'You busted. Dealer wins!'
            break
        case (score < 21 && users[0].points == 21):
            win.innerText = 'Blackjack! You win!'
            break
        case (score < 21 && score > users[0].points):
            win.innerText = 'Dealer wins!'
            break
        case (score < 21 && score < users[0].points):
            win.innerText = 'You win!'
            break
        case (score < 21 && score == users[0].points):
            win.innerText = 'You win!'
            break
    }
}

function changeDeck(){
    let deck = document.getElementById('deck')
    deck.innerText = 'Cards left: ' + shuffledDeck.length
}

let hitButton = document.querySelector('#hit')
let message = document.querySelector('#message')
hitButton.addEventListener('click', ()=>{
    if (users[0].points == 21){
        hitButton.disabled = true
        message.innerText = "You have 21 points! You dont want to hit. Click 'Stay'"
    } else if (users[0].points < 21){
        hitMe(0)
    } else {
        hitButton.disabled = true
        message.innerText = "You busted. You cannot hit again. Click 'Stay'"
    }
})

let stayButton = document.querySelector('#stay')
stayButton.addEventListener('click', ()=>{
    message.innerText = ''
    stayButton.disabled = true
    hitButton.disabled = true
    dealerPlay(users[1])
    dealButton.disabled = false
})

function removeCards(idx){
    let len = users[idx].hand.length
    users[idx].hand.splice(0,len)
}
let dealButton = document.querySelector('#deal')
dealButton.addEventListener('click', ()=>{
    // users = Object.assign('users', 'template')
    removeCards(0)
    removeCards(1)
    users[0].points = playerHandScore()
    users[1].points = dealerHandScore()
    playerPoints.innerText = users[0].points
    dealerPoints.innerText = users[1].points
    let clearPlayer = document.getElementById('hand-Player');
    while ( clearPlayer.firstChild ) clearPlayer.removeChild( clearPlayer.firstChild );
    let clearDealer = document.getElementById('hand-Dealer');
    while ( clearDealer.firstChild ) clearDealer.removeChild( clearDealer.firstChild );
    dealHand()
    dealButton.disabled = true
    stayButton.disabled = false
    hitButton.disabled = false
})

//// ----------------------------------------------------------------------
dealButton.disabled = true
dealHand()
// console.log(users[0])
// console.log(users[1])
// console.log(shuffledDeck)
