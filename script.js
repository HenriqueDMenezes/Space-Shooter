const suaNave = document.querySelector('.atirador');
const playArea = document.querySelector('#main-play-area');


//Movimento e tiro da nave
function flyAhip(event){
  if(event.key== 'ArrowUp'){
    event.preventDefault();
    moveUp();
  }else if (event.key=='ArrowDown'){
    event.preventDefault();
    moveDown();
  }else if(event.key===" "){
    event.preventDefault();
    fireLaser();
  }
}

//Função de subir
function moveUp(){
  let topPosition = getComputedStyle(suaNave).getPropertyValue('top');
  if(topPosition==="0px"){
    return;
  }else{
    let postition = parseInt(topPosition);
    postition -= 50;
    suaNave.style.top = `${postition}px`
  }
}

//função de descer
function moveDown(){
  let topPosition = getComputedStyle(suaNave).getPropertyValue('top');
  if(topPosition==="500px"){
    return;
  }else{
    let position = parseInt(topPosition)
    position +=50;
    suaNave.style.top = `${position}px`
  }
}

//Funções de tiro
function fireLaser(){
  let laser = createLaserELement();
  playArea.appendChild(laser)
  moveLaser(laser);
}

function createLaserELement(){
  let xPosition = parseInt(window.getComputedStyle(suaNave).getPropertyValue('left'));
  let yPosition = parseInt(window.getComputedStyle(suaNave).getPropertyValue('top'));
  let newLaser = document.createElement('img');
  newLaser.src = 'img/shoot.png';
  newLaser.classList.add('laser');
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition -10}px`;
  return newLaser;
}


function moveLaser(laser){
  let laserInterval = setInterval(()=>{
      let xPosition = parseInt(laser.style.left)

    if(xPosition === 340){
      laser.remove();
    }else {
     laser.style.left = `${xPosition + 8}px`;
    }

  },10);

   
}

window.addEventListener('keydown',flyAhip)
