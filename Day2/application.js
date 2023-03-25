// start
main();

function main(){
  const startBtn = document.querySelector("#start1");
  startBtn.addEventListener("click", gameStart);
}

function gameStart(){
  const playBox = document.querySelector(".play-box");
  const gameOverBox = document.querySelector(".game-over-box");
  playBox.style.display = 'block';
  gameOverBox.style.display = 'none';
  
  const startBtn = document.querySelector("#start1");
  startBtn.style.display = 'none';
  flipCard(range(0, 16));
  cardColorSave = printCardColors();
  setTimeout(() => {
    flipCard(range(0, 16));
    printCardGray(range(0, 16));
    gamePlay(cardColorSave);
  }, 3000);
}

function gamePlay(cardColorSave){
  let paired = new Array(16).fill(0);
  let opened = [0];
  let onClick = false;

  for(let i = 0; i < 16; i++){
    let card = document.querySelector(`.item:nth-child(${i+1})`);
    card.addEventListener("click", () => {
      if(paired[i] == 1 || onClick) return;
      onClick = true;
      paired, opened = clickCard(i, paired, opened, card);
      setTimeout(() => {
        onClick = false;
      }, 500);
    });
  }
}

function gameOver(){
  setTimeout(() => {
    const playBox = document.querySelector(".play-box");
    const gameOverBox = document.querySelector(".game-over-box");
    playBox.style.display = 'none';
    gameOverBox.style.display = 'block';
    const startBtn = document.querySelector("#start2");
    startBtn.addEventListener("click", gameStart);
  }, 500);
}

function clickCard(i, paired, opened, card){
  flipCard([i])
  card.style.backgroundColor = cardColorSave[i];
  opened[0] += 1;
  opened.push(i);
  if(opened[0] === 2){
    let isPair = checkPair(opened[1], opened[2]);
    if(isPair){ // cant flip
      setTimeout((opened) => {
        paired[opened[1]] = 1, paired[opened[2]] = 1;
        opened.pop();
        opened.pop();
        if(paired.filter((item) => {
          return item !== 1;
        }).length === 0){
          gameOver();
        }
      }, 500, opened);
    }
    else{ // 원위치
      setTimeout((opened) => {
        flipCard([opened[1], opened[2]]);
        printCardGray([opened[1], opened[2]]);
        opened.pop();
        opened.pop();
      }, 500, opened);
    }
    opened[0] = 0;
  }
  return paired, opened;
}

function checkPair(aIdx, bIdx){
  let cardA = document.querySelector(`.item:nth-child(${aIdx+1})`);
  let cardB = document.querySelector(`.item:nth-child(${bIdx+1})`);
  if(cardA.style.backgroundColor === cardB.style.backgroundColor)
    return true;
  else
    return false;
}

function flipCard(cards){ // 카드 인덱스 받음 (item nth-child idx)
  for(let i = 0; i < cards.length; i++){
    let card = document.querySelector(`.item:nth-child(${cards[i]+1})`);
    card.classList.toggle('flip-card');
  }
}

function printCardGray(cards){
  for(let i = 0; i < cards.length; i++){
    let card = document.querySelector(`.item:nth-child(${cards[i]+1})`);
    card.style.backgroundColor = 'gray';
  }
}

function printCardColors() {
    const colors = ['#856C8B', '#D4EBD0', '#A4C5C6', '#FFEB99', '#F2E9D0', '#EACEB4', '#E79E85', '#BB5A5A'];
    let cardsColorSave = new Array(16).fill("");
    let idx =  range(0, 16); // 색칠 안된 카드 idx
    for(let i = 0; i < 16; i++){
        const color = colors[Math.floor(i / 2)];
        let rndN = Math.floor(Math.random() * idx.length);
        let selectedChild = idx[rndN];
        idx.splice(rndN,1);
        let card = document.querySelector(`.item:nth-child(${selectedChild+1})`);
        card.style.backgroundColor = color;
        cardsColorSave[selectedChild] = color;
    }
    return cardsColorSave;
}

function range(start, end) {
  let array = [];
  for (let i = start; i < end; i++) {
    array.push(i);
  }
  return array;
}




