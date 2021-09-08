const suaNave = document.querySelector('.atirador');
const playArea = document.querySelector('#main-play-game');


//Movimento e tiro da nave
function flyAhip(event){
  if(event.key== 'ArrowUp'){
    event.preventDefault();
    moveUp();
  }else if (event.key=='ArrowDoen'){
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
    return
  }else{
    let postition = parseInt(topPosition)
    postition -= 50;
    suaNave.style.top = `${postition}px`
  }
}
