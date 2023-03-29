


const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')
const userChoices = [rock,paper,scissors]
const userPickDisplay = document.getElementById("user-pick-display")
const userContainer = document.getElementById("user-container")
const userChoiceContainer = document.getElementById('user-choice-container')
let lastUserPick = null

const computerRock = document.getElementById('computer-rock')
const computerPaper = document.getElementById('computer-paper')
const computerScissors = document.getElementById('computer-scissors')
const computerChoices = [computerRock,computerPaper, computerScissors]
const computerPickDisplay = document.getElementById('computer-pic-display')
const computerContainer = document.getElementById("computer-container")
const computerChoiceContainer = document.getElementById('computer-choice-container')
const computerImagesSrc = ["./images/paper-computer.jpg","./images/rock-computer.jpg","./images/scissors-computer.jpg"]
let lastComputerPick = null
const resultText = document.getElementById('result')



let shuffleAnimation = null

const hoverMusic = new Audio('./sound-effects/hover.wav')
const clickMusic = new Audio('./sound-effects/click.wav')
const spinMusic =  new Audio('./sound-effects/spinning.wav')
const winMusic = new Audio('./sound-effects/win.wav')
const loseMusic = new Audio('./sound-effects/lose.wav')



function greyOutOther(choiceName, choices = userChoices){
    console.log(choices)
    for(choice of choices){
        if (choice.id === choiceName){
            choice.style.opacity = 1;
            choice.style.width = "24%"
            lastComputerPick = choice.id.split("-")[1]
        }

        else{
            choice.disabled = true;
            choice.style.opacity = 0.3;
            choice.style.pointerEvents = "none"
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

userChoices.map(choice => {
    choice.onmouseover = () =>{
        hoverMusic.play()
        hoverMusic.playbackRate = 4
        userPickDisplay.src = choice.getElementsByTagName('img')[0].src
        resultText.innerText = `${capitalizeFirstLetter(choice.id)}`
        lastUserPick = choice.id
        
    }
})

userChoices.map(choice => {
    choice.onclick = () =>{
        clickMusic.play()
        choice.style.pointerEvents = "none"
        choice.style.width = "24%"
        greyOutOther(choice.id)
        resultText.innerText = `You Picked:  ${choice.id}`
        spinMusic.play()
        spinMusic.voulme = 0.5
        spinMusic.playbackRate = 0.8
        shuffleAnimation = setInterval(computerChoose, 250)
        resultText.innerText = "Computer Picking."
        

    }
})


let howManyTimeRun = 0


function computerChoose(){
    resultText.innerText += "." 
    let randomComputerPick = computerImagesSrc[Math.floor(Math.random()*3)]
    computerPickDisplay.src = randomComputerPick

    switch(randomComputerPick){
        case "./images/paper-computer.jpg":
            greyOutOther("computer-paper", computerChoices)
            break
        
        case "./images/rock-computer.jpg":
            greyOutOther("computer-rock", computerChoices)
            break

        case "./images/scissors-computer.jpg":
            greyOutOther("computer-scissors",computerChoices)

    }

    howManyTimeRun += 1


    if(howManyTimeRun === 8){
        clearInterval(shuffleAnimation)
        spinMusic.pause()
        checkWhoWon()
    }
}


const playerWon = () => {
        resultText.innerText = "Congrats, You've Won!!!!"
        computerContainer.style.borderColor = "red"
        computerChoiceContainer.style.borderColor = "red"
        userContainer.style.borderColor = "rgb(41, 230, 41)"
        userChoiceContainer.style.borderColor= "rgb(41, 230, 41)"
        winMusic.play()
}

const computerWon = () =>{
    resultText.innerText = "Ah Shit, You've Lost!!!!"
    userContainer.style.borderColor = "red"
    userChoiceContainer.style.borderColor = "red"
    computerContainer.style.borderColor  = "rgb(41, 230, 41)"
    computerChoiceContainer.style.borderColor = "rgb(41, 230, 41)"
    loseMusic.play()
}

const checkWhoWon = () =>{
    console.log(`${lastUserPick} vs ${lastComputerPick}`)

    if(lastUserPick === lastComputerPick){
        resultText.innerText = "Woah, It's A Draw"
    }

    else if(lastUserPick === "scissors" && lastComputerPick ==="paper"){
        playerWon()
    }

    else if(lastUserPick === "paper" && lastComputerPick ==="rock"){
        playerWon()
    }

    else if(lastUserPick === "rock" && lastComputerPick ==="scissors"){
        playerWon()
    }

    else if(lastUserPick === "rock" && lastComputerPick ==="paper"){
       computerWon()
    }

    
    else if(lastUserPick === "scissors" && lastComputerPick ==="rock"){
        computerWon()
    }

    
    else if(lastUserPick === "paper" && lastComputerPick ==="scissors"){
        computerWon()
    }
}

document.addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        document.location.reload()
    }
})