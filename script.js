const suaNave = document.querySelector('.atirador');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png','img/monster-2.png','img/monster-3.png']

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
      let aliens = document.querySelectorAll('.alien');

      aliens.forEach((alien)=>{//comparando se cada alien foi atingido, se sim, troca o src da imagem.
        if(colisao(laser,alien)){
          alien.src='img/explosion.png';
          alien.classList.remove('alien')
          alien.classList.add('dead-alien');
        }
      })

    if(xPosition === 340){
      laser.remove();
    }else {
     laser.style.left = `${xPosition + 8}px`;
    }

  },10);

}

//função para criar os inimigos aleatórios. 
function createAliens(){
  let newAlien = document.createElement('img');
  let alienSprite = aliensImg[Math.floor(Math.random()*aliensImg.length)]//sorteio de imagens
  newAlien.src = alienSprite;
  newAlien.classList.add('alien');
  newAlien.classList.add('alien-transition');
  newAlien.style.left = '370px';
  newAlien.style.top = `${Math.floor(Math.random()*330) + 30}px`
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
}


//função para movimentar os inimigos
function moveAlien(alien){
  let moveAlienInterval = setInterval(()=>{
    let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'))
    if(xPosition <=50){
      if(Array.from(alien.classList).includes('dead-alien')){
        alien.remove()
      } else {
          gameOver();
      }
    }else{
        alien.style.left = `${xPosition -4}px`;
      }
    
  },30)
}

//função para colisão 
function colisao(laser,alien){
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = laserTop -20;
  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = alienTop - 30;

  if(laserLeft!=340 && laserLeft+40>=alienLeft){
    if(laserTop<=alienTop && laserTop >= alienBottom){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }

}

window.addEventListener('keydown',flyAhip)
createAliens();