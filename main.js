
const container = document.querySelector(".container");
const find = document.querySelector(".find");
const countdown = document.querySelector(".countdown");
const level = document.querySelector(".level");
const timer = document.querySelector(".timer");
const start_button = document.querySelector(".start");
const restart = document.querySelector(".restart")
const scoreelement = document.querySelector('.score')
const body=document.getElementsByTagName('body')[0]
let isrestart = false;
let NumberToFind;
let score = 0;
let selected_level='Easy'

let failed=['aayein.mp3','error.mp3','fart.mp3','movie_1.mp3']
let success=['ahh.mp3','pew.mp3']




level.addEventListener('change',(e)=>{
    selected_level=e.target.value
    // console.log(e.target.value)
})


//random color generator
function random_color(){
    let color='#';
    let hex=[1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
    
    for(let i=0;i<6;i++){
        color+=hex[GenerateRandomNumber(0,14)]
        
    }
    return color;

}



function PlayAudio(filename,volume=1) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(filename);
    
    // Create a source and connect it to a gain node
    const source = audioContext.createMediaElementSource(audioElement);
    const gainNode = audioContext.createGain();
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set volume (can go above 1.0 for amplification)
    gainNode.gain.value = volume;
    
    audioElement.play();
}


function GenerateRandomNumber(x = 0, y = 1) {
    const random = Math.floor(Math.random() * (y - x + 1) + x);
    return random;
}

function makeBubble(x = 2) {

    let array=[]

    container.innerHTML = '';
    for (let i = 0; i < x; i++) {
        
        const element = document.createElement("div");
        element.setAttribute("class", "bubble");
        const random=GenerateRandomNumber(1, 10);
        element.innerHTML = random // set some random number in the innerhtml

        if(!array.includes(random)){

            array=[...array,random]
        }
        container.appendChild(element);
    }

    array.sort();

    
}

async function startGame() {
    

    if(selected_level == 'Hard'){
        PlayAudio('./Level/Hard.mp3')
    }
    else if (selected_level == 'Advance'){
        PlayAudio('./Level/Advance.mp3')
    }
    
    let i = 3;
    countdown.style = "display:flex"
    
    await new Promise((resolve) => {
        const intervalid = setInterval(() => {
            countdown.innerHTML = --i;
            if (countdown.innerHTML == 0) {
                clearInterval(intervalid);
                resolve('Countdown Is Done')
                // countdown.innerHTML='Go'
                countdown.style = "display:none";
            }
        }, 1000);
        
    })
    
    
    makeBubble(40)


    //hard mode

    if(selected_level == 'Hard'){

    }

   
    
    let time = 60;
    const id = setInterval(() => {
        timer.innerHTML = 'Time: ' + --time;

        if (time == 0) {
            level.style = 'display:block'
            restart.innerHTML = 'Your Score: ' + score + ' Restart ?'
            restart.style = 'display:block'
            clearInterval(id)
        }

        if (isrestart == true) {
            clearInterval(id)
            timer.innerHTML = 'Time:0'
            return true;
        }

    }, 1000);


    //generating a number for finding

    NumberToFind = GenerateRandomNumber(1, 10)

    find.innerHTML = 'Find:' + NumberToFind;



    container.addEventListener('click', (e) => {

        if (time != 0) {

            if (e.target.innerHTML == NumberToFind) {
                
                score += 10;
                scoreelement.innerHTML = 'Score :' + score;
                NumberToFind = GenerateRandomNumber(1, 10)
                PlayAudio(`./Success/${success[GenerateRandomNumber(0,success.length-1)]}`,1)
                find.innerHTML = 'Find:' + NumberToFind;
                makeBubble(40)
                
            }

            else{
                
                PlayAudio(`./Failed/${failed[GenerateRandomNumber(0,failed.length-1)]}`,1)
            }
        }



    })





}



start_button.addEventListener("click", async () => {
    await startGame();
    start_button.style = 'display:none'
    level.style = 'display:none'


});


