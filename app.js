window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.woot');
// words.appendChild(p);


const cards = document.querySelectorAll('.card');
cards.forEach(card => card.style.visibility = "hidden")
words.style.visibility = "hidden";
const hiddenDisplay = [...document.querySelectorAll('.hidden')];

// console.log(hiddenDisplay[0].classList.contains("hidden"));
let woot = false;
function isHidden() {
  let times = 0;
  hiddenDisplay.forEach(display => {
    if (display.classList.contains("cover")) {
      // console.log('yes!');
      times += 1;
    }
    // console.log(times);
    if (times >= 4) {
      // console.log('finale');
      cards.forEach(card => card.classList.add('finale'));
      woot = true;
    }
  })
}

const wootHeader = document.querySelectorAll('.woot-header');
const magicWord = document.querySelector('.magic-word');
const displayWord = document.querySelector('.display-4');
const france = document.querySelector('.fr');
const greece = document.querySelector('.nr');
const japan = document.querySelector('.jp');
const spain = document.querySelector('.sp');

recognition.addEventListener('result', e => {
  // console.log(e.results);
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("")

    p.textContent = transcript;
    if(transcript.includes('unicorn')) {
      console.log("🦄");
    } else if(transcript.includes('abracadabra')) {
      console.log('👻');
      cards.forEach(card => card.classList.add('show'))
      magicWord.textContent = ""
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

    let simSalaBim = false;
    if(woot === true) {
      words.classList.add('show');
      if(transcript.includes('Sim Sala Bim')) {
        wootHeader.textContent = "";
        p = document.createElement('p');
        p.textContent = transcript;
        words.appendChild(p);
        simSalaBim = true;
      }
    }
    if (simSalaBim) {
      if(e.results[0].isFinal) {
        p = document.createElement('p');
        // p.textContent = transcript;
        words.appendChild(p);
      }
    };
    console.log(transcript);
})

recognition.addEventListener('end', recognition.start)
recognition.start();