// Random Ball Placement
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 300;
var xSpeed = (2, 7);
var ySpeed = (-7, -2);
var score = 0

// Initialize brick array
var bricks = [];
if (bricks.length === 0){
  bricks.length = 0;
  for(let i=0; i<20; i++) {
    let x = Math.random()*300 + 50;
    let y = Math.random()*150 + 50;
    while(checkOverlap(x, y)) {
      x = Math.random()*300 + 50;
      y = Math.random()*150 + 50;
    }
    bricks.push({
      x: x,
      y: y,
      width: 50,
      height: 20,
    });
  }
}

function checkOverlap(x, y) {
  for(let i=0; i<bricks.length; i++) {
    if(x + 50 > bricks[i].x && x < bricks[i].x + 50 && y + 20 > bricks[i].y && y < bricks[i].y + 20) {
      return true;
    }
  }
  return false;
}

function draw() {
  //Render Background
  background(0);

  //Render Paddle
  fill('#ffffff');
  rect(mouseX, 375, 90, 15);

  //Render Bricks
  for(let i=0; i<bricks.length; i++) {
    fill('#d9c3f7');
    rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
  }
  
    //Check if all bricks are broken
    if(bricks.length == 0) {
      //Redraw bricks
      for(let i=0; i<20; i++) {
        let x = Math.random()*300 + 50;
        let y = Math.random()*150 + 50;
        while(checkOverlap(x, y)) {
          x = Math.random()*300 + 50;
          y = Math.random()*150 + 50;
        }
        bricks.push({
          x: x,
          y: y,
          width: 50,
          height: 20,
        });
      }
    }


  //Render Ball
  fill('#d9c3f7');
  ellipse(xBall, yBall, 20, 20);

  //Actions
  move();
  bounce();
  paddle();
  checkCol();
  removeBricks();

  //Score
  fill('#d9c3f7');
  textSize(24);
  text("Score: " + score, 10, 25);
}

function checkCol() {
  for(let i=0; i<bricks.length; i++) {
    if(xBall + 10 > bricks[i].x && xBall - 10 < bricks[i].x + bricks[i].width && yBall > bricks[i].y && yBall < bricks[i].y + bricks[i].height) {
      ySpeed *= -1;
      bricks.splice(i, 1);
      score += 5;
    }
  }
}

function removeBricks() {
  bricks = bricks.filter(function(brick) {
    return brick.y < 500;
  });
}

// Canvas
function setup() {
  createCanvas(400, 400);
}

// Ball Functions
function move() {
  xBall += xSpeed;
  yBall += ySpeed;
}

function bounce() {
  if (xBall < 10 ||
    xBall > 400 - 10) {
    xSpeed *= -1;
  }
  if (yBall < 10 ||
    yBall > 400 - 10) {
    ySpeed *= -1;
  }
}

function display() {
  fill('#d9c3f7');
  ellipse(xBall, yBall, 20, 20);
}

// Bounce off Paddle
function paddle() {
  if ((xBall > mouseX &&
    xBall < mouseX + 90) &&
    (yBall + 10 >= 375)) {
    xSpeed *= -1;
    ySpeed *= -1;
    score++;

  }
}
