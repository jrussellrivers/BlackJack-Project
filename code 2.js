/*
const button = document.querySelector('button')
// let clickButt = ()=>{console.log('click')}
// let anotherFunc = ()=>{
//     alert('You have been clicked')
//     button.removeEventListener('click', anotherFunc)
// }

// This method is old and not used anymore:
// button.onclick = clickButt // This line doesnt run
// button.onclick = anotherFunc

// button.addEventListener('click', clickButt)
// button.addEventListener('click', anotherFunc)

window.addEventListener('resize', function(evt){
    console.log(evt)
    console.log(window.innerWidth)
})

button.addEventListener('click', event=>{
    console.log(event)
})
*/

// ------------------------------------------------------------

let button = document.querySelector('#add-element')
const createCard = (title, content, extra) =>{
    let newCard = document.createElement('div')
    newCard.setAttribute('class', 'card')

    let newH2 = document.createElement('h2')
    newH2.append(title)

    let newP = document.createElement('p')
    newP.append(content)

    let newExtra = document.createElement('p')
    newExtra.setAttribute('class', 'extra')
    newExtra.append(extra)

    newCard.append(newH2, newP, newExtra)

    return newCard
    // document.getElementById('cards').append(newCard)
}

button.addEventListener('click', ()=>{
    let titleInput = document.getElementById('card-title')
    let contentInput = document.getElementById('card-content')
    let extraInput = document.getElementById('card-extra')

    let newCard = createCard(titleInput.value, contentInput.value, extraInput.value)
    document.getElementById('cards').append(newCard)

    titleInput.value = ''
    contentInput.value = ''
    extraInput.value = ''
})