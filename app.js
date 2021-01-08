window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

const woot = document.querySelector('.woot');
const magicWord = document.querySelector('.magic-word');
const displayWord = document.querySelector('.display-4');
const france = document.querySelector('.fr');
const greece = document.querySelector('.nr');
const japan = document.querySelector('.jp');
const spain = document.querySelector('.sp');
const cards = document.querySelectorAll('.card');
const hiddenDisplay = [...document.querySelectorAll('.hidden')];
const words = document.querySelector('.words');

// console.log(hiddenDisplay[0].classList.contains("hidden"));
let wordsDisplay = false;
let simSalaBim = false;
let p = document.createElement('p');

words.appendChild(p);
cards.forEach(card => card.style.visibility = "hidden")
words.style.visibility = "hidden";
woot.style.visibility = "hidden";

recognition.addEventListener('result', e => {
  // console.log(e.results);
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("")

    p.textContent = transcript;
    if(e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }

    if(transcript.includes('unicorn')) {
      console.log("🦄");
    } else if(transcript.includes('abracadabra')) {
      console.log('👻');
      cards.forEach(card => card.classList.add('show'));
      magicWord.textContent = "";
      displayWord.textContent = "Now can you guess the country?"
    }
    if(displayWord.textContent === "Now can you guess the country?") {
      if(transcript.includes('France')) {
        console.log("🥐");
        france.classList.add('cover');
        isHidden();
      } else if(transcript.includes('Japan')) {
        console.log("🍣");
        japan.classList.add('cover')
        isHidden();
      } else if(transcript.includes('Spain')) {
        console.log("🐂");
        spain.classList.add('cover');
        isHidden();
      } else if(transcript.includes('Greece')) {
        console.log("🗻");
        greece.classList.add('cover');
        isHidden();
      }
    }
    if(transcript.includes('Sim Sala Bim')) {
      woot.classList.add("finale");
      cards.forEach(card => card.classList.add('finale'));
      words.classList.add('show');
    }
    console.log(transcript);
})

function isHidden() {
  let times = 0;
  hiddenDisplay.forEach(display => {
    if (display.classList.contains("cover")) {
      times += 1;
    }
    if (times >= 4) {
      cards.forEach(card => card.classList.add('finale'));
      woot.classList.add("show");
    }
  })
}

recognition.addEventListener('end', recognition.start)
recognition.start();