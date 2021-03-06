const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quote-display");
const quoteInputElement = document.getElementById("quote-input");
const timerElement = document.getElementById("timer");
const popup = document.getElementById("popup");
const toastMsg = document.getElementById("toast-msg");
const Playbtn = document.getElementById("play");
const Replaybox = document.getElementById("replay-box");
const Replaybtn = document.getElementById("replay-btn");
const scoreBoard= document.getElementById("score");
const wordBoard= document.getElementById("word");
let score = 0;
Replaybox.style.display="none";
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayvalue = quoteInputElement.value.split("");
  Replaybox.style.display="none";
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {

    const character = arrayvalue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character == characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    score++;
    scoreBoard.innerText=score;
    Replaybox.style.display="block";
    popup.innerText = "You have completed in "+ getTimerTime() + " second!";
    timerElement.style.display = "none";
    quoteInputElement.readOnly = true;
    renderNewQuote();
    Replaybtn.addEventListener("click", () => {
        quoteInputElement.readOnly = false;
        startTimer();
      popup.innerText = "";
      timerElement.style.display = "block";
      Replaybox.style.display="none";
      toastMsg.style.display='none';
    });
  }
});
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((Response) => Response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach((character) => {
    let quoteLength=quote.length;
    wordBoard.innerText=quoteLength;
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  //  popup.innerText='';
 
}
quoteInputElement.readOnly = true;
quoteInputElement.addEventListener('click',()=>{
  if (quoteInputElement.readOnly == true) {
    // alert("please start the game!!")
    toastMsg.style.display='block';
    toastMsg.innerHTML="please click to Play button!!";
  }
})

Playbtn.addEventListener('click',()=>{
    quoteInputElement.readOnly = false;
    startTimer();
    renderNewQuote();
    Playbtn.style.display="none";
    toastMsg.style.display='none';
})
let startTime;
let myvar;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  myvar = setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
