var cvs = document.getElementById("canvas");
var btn = document.getElementById("button");
var ctx = cvs.getContext("2d");

var zharp = new Image();
var bg = new Image();
var fg = new Image();
var prep2 = new Image();
var prep1 = new Image();

// Изображения
zharp.src = "img/zharp.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
prep1.src = "img/prep1.png";
prep2.src = "img/prep2.png";

// Звуковые файлы
var fly = new Audio();
var scoreSound = new Audio();
var luckLvlSound = new Audio();
var luckLvl7Sound = new Audio();

fly.src = "audio/fly.mp3";
scoreSound.src = "audio/score.mp3";
luckLvlSound.src = "audio/luck-lvl.mp3";
luckLvl7Sound.src = "audio/luck-lvl7.mp3";

var gap = 120;
var flyUp = 0;
var moveUpTouch = 0;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

// При нажатии на экран телефона
btn.addEventListener('touchstart', (event) => {
  btn.innerHTML = '';
  moveUp();
  moveUpTouch = setInterval(function(){
    moveUp();
  },120);
});

btn.addEventListener('touchend', (event) => {
  clearInterval(moveUpTouch);
});

function moveUp() {
yPos -= 25;

zharp.src = "img/zharp2.png";
if (flyUp) { 
    clearTimeout(flyUp); 
}
flyUp = setTimeout(() => {
   zharp.src = "img/zharp.png";
 }, 200);

fly.play();
}

// Создание блоков
var prep = [];

prep[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
var luckLvl = 1;
// Позиция Жар-птицы
var xPos = 12;
var yPos = 160;
var grav = 1.6;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for(var i = 0; i < prep.length; i++) {
    ctx.drawImage(prep2, prep[i].x, prep[i].y);
    ctx.drawImage(prep1, prep[i].x, prep[i].y + prep2.height + gap);

    prep[i].x--;

    if(prep[i].x == 125) {
      prep.push({
      x : cvs.width,
      y : Math.floor(Math.random() * prep2.height) - prep2.height
      });
    }

    // Отслеживание прикосновений
    if(xPos + zharp.width >= prep[i].x
    && xPos <= prep[i].x + prep2.width
    && (yPos <= prep[i].y + prep2.height
    || yPos + zharp.height >= prep[i].y + prep2.height + gap) || yPos + zharp.height >= cvs.height - fg.height) {
      location.reload(); // Перезагрузка страницы
      return; 
    }

    if(prep[i].x == 5) {
      score++;

      //  Уровни Счастья
      if (score == 10) {
          setTimeout(() => {
            gap = 110;
          }, 700);
          luckLvl++;
          cvs.style = "border-color: rgb(255, 140, 0)";
         luckLvlSound.play();
      }

      if (score == 20) {
          setTimeout(() => {
            gap = 100;
          }, 700);
          luckLvl++;
          cvs.style = "border-color: rgb(255, 230, 0)";
          luckLvlSound.play();
      }

      if (score == 30) {
          setTimeout(() => {
            gap = 90;
          }, 700);
          luckLvl++;
          cvs.style = "border-color: rgb(30, 225, 0)";
          luckLvlSound.play();
      }

      if (score == 40) {
          setTimeout(() => {
            gap = 85;
          }, 700);
          luckLvl++;
          cvs.style = "border-color: rgb(0, 204, 255)";
          luckLvlSound.play();
      }

      if (score == 50) {
          setTimeout(() => {
            gap = 80;
          }, 700);
          luckLvl++;
          cvs.style = "border-color: rgb(0, 119, 255)";
          luckLvlSound.play();
      }

      if (score == 60) {
          setTimeout(() => {
            gap = 75;
          }, 700);
          luckLvl++;
          cvs.style = "border-color: rgb(221, 0, 255)";
          luckLvlSound.play();
      }

      if (score == 70) {
          cvs.style = "border-color: rgb(255, 255, 255)";
          luckLvl7Sound.play();
      }

      if (score != 10 && score != 20 && score != 30 && score != 40 && score != 50 && score != 60 && score != 70) {
        scoreSound.play();
      }
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(zharp, xPos, yPos);

  yPos += grav;

  // Счёт
  ctx.fillStyle = "#000";
  ctx.font = "25px Arial";
  ctx.fillText("Счет: " + score, 12, cvs.height - 52);
  ctx.fillText("Ур. Счастья: " + luckLvl, 12, cvs.height - 16);

  requestAnimationFrame(draw);
}

prep1.onload = draw;