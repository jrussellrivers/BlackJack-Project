// Log Button Click

let button = document.querySelector('#test-button')
let clickButt = ()=>{console.log('Button Pressed')}
button.addEventListener('click', clickButt)

// Log Button Pressed

let button2 = document.querySelector('#test2')
button2.addEventListener('click', function(event){
    if(event.button === 0){
        console.log('You Left Clicked')
    }
})

window.addEventListener('resize', () => {
    console.log('You Change the size of the Window!')
})
