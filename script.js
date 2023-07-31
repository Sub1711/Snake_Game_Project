

const canvas =document.querySelector("canvas#world")
const ctx = canvas.getContext("2d")

// putting the x snake value in the center of the screen
let x = 0
// putting the y snake value in the buttom of the screen 
let y = 0


let appleRadius = 10
let snakeHeight = 20
let snakeWidth = 20
let score = 0
let appleCount = 0
let speedCount = 10
let speedSnake = 200
let snakeX = 0;
let snakeY = canvas.height - 40
let interval
let dx = snakeWidth
let dy = 0
let axisX = 1
let axisY = 0
const arrX = [];
const arrY = [];
let arrBodySnake = [];
let snakeLength = -4

for(let c = appleRadius; c < canvas.width-appleRadius; c = c + appleRadius * 2){
    arrX.push(c);
};
for(let c = appleRadius; c < canvas.height-appleRadius; c = c + appleRadius * 2){
    arrY.push(c);
};


randomApple();
document.addEventListener("keyup", keyUpHandler, false)

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        if (axisX == -1){
            return
        }
        dx = snakeWidth
        dy = 0
        axisX = 1
        axisY = 0
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        if (axisX == 1){
            return
        }
        dx = -snakeWidth
        dy = 0
        axisX = -1
        axisY = 0
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        if (axisY == 1){
            return
        }
        dx = 0
        dy = -snakeHeight  
        axisY = -1
        axisX = 0
      }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        if (axisY == -1){
            return
        }
        dx = 0
        dy = snakeHeight    
        axisY = 1
        axisX = 0
    }
}

function containsObject(obj, list) {

    return list.some(function(elem) {
      return elem.x === obj.x & elem.y === obj.y
    })
}

function draw() {
    let toDelete = true;
      
    if(canvas.width - snakeX - snakeWidth < 0){
        snakeX -= canvas.width
        snakeY += dy
    }
    else if(snakeX < 0){
        snakeX += canvas.width
        snakeY += dy
    }
    else if(snakeY < 0){
        snakeX += dx
        snakeY += canvas.height
    }
    else if(canvas.height - snakeY - snakeHeight < 0){
        snakeX += dx
        snakeY -= canvas.height
    }
    else{
        snakeX += dx
        snakeY += dy
    }


    if ( 
        containsObject({x: snakeX, y: snakeY}, arrBodySnake)
        ) 
      {
        alert("GAME OVER!!!") 
        clearInterval(interval)
        return
      }

      if ((snakeY == y - appleRadius & x == snakeX + snakeWidth / 2)) {
        score += 10
        appleCount++
        randomApple()
        toDelete = false;

        if (appleCount % 3 == 0){
            speedSnake -= speedCount
            initInterval()
        }
    }

    arrBodySnake.push({x: snakeX, y: snakeY});

    drawSnake()

    if(toDelete & arrBodySnake.length > 3){
       let itemToRemove = arrBodySnake.shift();
       ctx.clearRect(itemToRemove.x, itemToRemove.y, snakeWidth, snakeHeight)
    }
}
function drawApple() {
    ctx.beginPath()
    ctx.arc(x, y, appleRadius, 0, Math.PI * 2)
    ctx.fillStyle = "#FF0000"
    ctx.fill()
    ctx.closePath()
}

function drawSnake() {
    ctx.beginPath()
    ctx.rect(snakeX,snakeY,snakeWidth,snakeHeight)
    ctx.fillStyle = "gold"
    ctx.fill()
    ctx.closePath()
}

function randomApple() {
    do { 
        x = arrX[Math.floor(Math.random() * arrX.length)]
        y = arrY[Math.floor(Math.random() * arrY.length)]
    }
    while (containsObject({x: x, y: y}, arrBodySnake))
    drawApple()
    snakeLength += 1
    updateScore()
}

function updateScore() {
//   console.log(snakeLength)
//   console.log(arrBodySnake.length)
    score = (3 + snakeLength) * 10
//   console.log(arrBodySnake.length)
    document.getElementById('score').innerText = score;
}

interval = setInterval(draw,speedSnake) /*  1000 - canges every 1sec */

function initInterval() {
    clearInterval(interval)
    interval = setInterval(draw,speedSnake) /*  1000 - canges every 1sec */
}