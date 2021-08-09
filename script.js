const RANDOM_QUOTE_API_URL='https://api.quotable.io/random';
const quoteDisplayElement=document.getElementById('quote-display');
const quoteInputElement=document.getElementById('quote-input');
const timerElement=document.getElementById('timer');


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
        renderNewQuote()
        alert("You have completed in "+getTimerTime()+"second, press ok to next quote.");
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
      startTimer()
}
renderNewQuote()

let startTime;
function startTimer() {
    timerElement.innerText=0;
    startTime=new Date()
    setInterval(() => {
       timer.innerText = getTimerTime()
    }, 1000);
}
function getTimerTime() {
   return Math.floor((new Date() - startTime)/1000)
}