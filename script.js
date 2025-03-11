var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/zharp.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/der2.png";
pipeBottom.src = "img/der.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var luckLvlSound = new Audio();
var luckLvl7Sound = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
luckLvlSound.src = "audio/luck-lvl.mp3";
luckLvl7Sound.src = "audio/luck-lvl7.mp3";

var gap = 120;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);
cvs.addEventListener("click", moveUp);

var flyUp = 0;

function moveUp() {
yPos -= 25;

bird.src = "img/zharp2.png";
if (flyUp) { 
    clearTimeout(flyUp); 
}
flyUp = setTimeout(() => {
   bird.src = "img/zharp.png";
 }, 200);

fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
var luckLvl = 1;
// Позиция птички
var xPos = 12;
var yPos = 160;
var grav = 1.6;

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 return; 
 }

 if(pipe[i].x == 5) {
 score++;

 if (score == 1) {
    setTimeout(() => {
      gap = 110;
    }, 700);
    luckLvl++;
    cvs.style = "border-color: rgb(255, 140, 0)";
   //  luckLvlSound.play();
 }

 if (score == 2) {
    setTimeout(() => {
      gap = 100;
    }, 700);
    luckLvl++;
    cvs.style = "border-color: rgb(255, 230, 0)";
    luckLvlSound.play();
 }

 if (score == 3) {
    setTimeout(() => {
      gap = 90;
    }, 700);
    luckLvl++;
    cvs.style = "border-color: rgb(30, 225, 0)";
    luckLvlSound.play();
 }

 if (score == 4) {
    setTimeout(() => {
      gap = 85;
    }, 700);
    luckLvl++;
    cvs.style = "border-color: rgb(0, 204, 255)";
    luckLvlSound.play();
 }

 if (score == 5) {
    setTimeout(() => {
      gap = 80;
    }, 700);
    luckLvl++;
    cvs.style = "border-color: rgb(0, 119, 255)";
    luckLvlSound.play();
 }

 if (score == 6) {
    setTimeout(() => {
      gap = 75;
    }, 700);
    luckLvl++;
    cvs.style = "border-color: rgb(221, 0, 255)";
    luckLvlSound.play();
 }

 if (score == 7) {
    cvs.style = "border-color: rgb(255, 255, 255)";
    luckLvl++;
    luckLvl7Sound.play();
 }

 if (   score != 2 && score != 3 && score != 4 && score != 5 && score != 6 && score != 7) {
   score_audio.play();
 }

 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "25px Arial";
 ctx.fillText("Счет: " + score, 110, cvs.height - 52);
 ctx.fillText("Уровень Счастья: " + luckLvl, 30, cvs.height - 16);

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;