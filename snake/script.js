let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../snake/assets/eating.mp3');
const gameOverSound = new Audio('../snake/assets/game_over.mp3');
const moveSound = new Audio('../snake/assets/move.mp3');
const gameStartSound = new Audio('../snake/assets/game_start.mp3');
const musicSound = new Audio('../snake/assets/bacjground_music.mp3');
const board = document.getElementById('board');
let score = 0;
let speed = 3;
 let hiscoreval=0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 17, y: 17 }
];
let food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function iscollide(sarr) {
    //bumping
    for (let i = 1; i < snakeArr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            speed = 3;
            swal({
            title: "THE END",
            text: "You died by bumping yourself",
            icon: "warning",
            })
            return true;
        }
    }
    //border 
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        speed = 3;
         swal({
            title: "THE END",
            text: "You died by getting hit by border",
            icon: "warning",
            })
        return true;
    }
}
function gameEngine() {
    //update the snake array
    if (iscollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 17, y: 17 }];
        musicSound.play();
        score = 0;
    }
    //if you have eaten food , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score+=1;
        if(score>hiscoreval)
        {    speed+=2;
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
              HighScoreBox.innerHTML="High-Score : "+hiscoreval ;
        }
        scoreBox.innerHTML="Score : "+ score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display snake and food
    board.innerHTML = "";
    // Display the snake
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
//main logic
gameStartSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
     hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval= JSON.parse(hiscore);
    HighScoreBox.innerHTML="High-Score : "+hiscore ;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});