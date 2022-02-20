let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext("2d");

var x = Math.random() * canvas.width;
var y = Math.random() * canvas.height;
var dx = 2;
var dy = -2;
var ballRadius = 20;
var paddleHeight = 10;
var paddleWidth = 150;
var paddleX = (canvas.width-paddleWidth) / 2;
var leftPressed = false;
var rightPressed = false;
var brickRowCount = 3;
var brickColumnCount = 16;
var brickWidth = 100;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetLeft = 30;
var brickOffsetTop = 30;
var score = 0;
var lives = 3;

var bricks = [];

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status:1 };
    }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("mousemove", mouseMoveHandler, false);

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function handleKeyDown(event){
    if(event.key == "Right" || event.key == "ArrowRight"){
        rightPressed = true
    }else if(event.key == "Left" || event.key == "ArrowLeft"){
        leftPressed = true
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function handleKeyUp(event){
    if(event.key == "Right" || event.key == "ArrowRight"){
        rightPressed = false
    }else if(event.key == "Left" || event.key == "ArrowLeft"){
        leftPressed = false
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // drawing code
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCircle();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    if(x > canvas.width-ballRadius || x < ballRadius) {
        dx = -dx;
    }
    if( y < ballRadius) {
        dy = -dy;  
    }else if(y > canvas.height-ballRadius){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy = -dy;
        }else{
            lives--;
            if(!lives) {
            alert(`Game Over`);
            document.location.reload();
            clearInterval(interval);
            }else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
              }
        }
    }

    if(rightPressed){
        paddleX += 7;
        if(paddleX+paddleWidth>canvas.width){
            paddleX = canvas.width-paddleWidth;
        }
    }else if(leftPressed){
        paddleX -= 7;
        if(paddleX<0){
            paddleX = 0;
        }
    }

    x+=dx;
    y+=dy;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

var interval = setInterval(draw, 10);