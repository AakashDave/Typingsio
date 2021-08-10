const RANDOM_QUOTE_API_URL='https://api.quotable.io/random';
const quoteDisplayElement=document.getElementById('quote-display');
const quoteInputElement=document.getElementById('quote-input');
const timerElement=document.getElementById('timer');
const popup=document.getElementById('popup');
const Playbtn=document.getElementById('play');
let myvar;
quoteInputElement.addEventListener('input',()=>{
    const arrayQuote=quoteDisplayElement.querySelectorAll('span');
    const arrayvalue=quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((characterSpan,index)=>{
        const character=arrayvalue[index];
        if (character==null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        else if (character==characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }else{
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;

        }
    })
    if (correct) {
        Playbtn.innerHTML="Replay";
        popup.innerText="you have completed in "+getTimerTime()+" second";
        timerElement.style.display="none";
         Playbtn.addEventListener('click',()=>{
            if(renderNewQuote()){
                popup.innerText='';
                timerElement.style.display="block";
            }
         })
    }

})
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(Response=>Response.json())
    .then(data=>data.content)
}

async function renderNewQuote() {
    
      const quote= await getRandomQuote();
     
     quoteDisplayElement.innerText='';
     quote.split('').forEach(character => {
         const characterSpan= document.createElement('span');
         characterSpan.innerText = character;
         quoteDisplayElement.appendChild(characterSpan);
     });
     quoteInputElement.value=null;
     
    
}
Playbtn.addEventListener('click',()=>{
    renderNewQuote()
    startTimer()
 })

let startTime;

function startTimer() {
    timerElement.innerText=0;
    startTime=new Date()
     myvar= setInterval(() => {
       timer.innerText = getTimerTime()
    }, 1000);
}
function getTimerTime() {
   return Math.floor((new Date() - startTime)/1000)
}

    