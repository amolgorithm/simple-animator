var brushSize = 10;
var brushMode = true;
var brushColor = color(0);
var animationFrames = [];
var frameDrawingX = [];
var frameDrawingY = [];
var thisFrame = PImage;
var numOfFrames = 0;
var playBackFrame = 0;
var playback = false;
var index = 0;

textAlign(CENTER);


var drawSetup = function() {
    fill(255);
    stroke(0);
    rect(25, 25, 350, 350);
    
    fill(0);
    ellipse(60, 10, 15, 15);
    fill(255, 0, 0);
    ellipse(80, 10, 15, 15);
    fill(0, 0, 255);
    ellipse(100, 10, 15, 15);
};

var drawText = function() {
    fill(0);
    
    textSize(20);
    text("Frame: " + numOfFrames, 200, 22);
    
    textSize(10);
    text("Press Right Arrow To Move Onto Next Frame - Press Space To See Animation\nPress E For Eraser And B For Brush. Press Arrows To Change Size Of Brush.", 200, 386);
};

drawSetup();
drawText();

var playbackAnimation = function() {
    drawSetup();
    tint(255, 255);
    frameRate(10);
    image(animationFrames[playBackFrame], 25, 25, 350, 350);
    playBackFrame++;
    
    if (playBackFrame === numOfFrames) {
        playback = false;
        playBackFrame = 0;
    }
};


var recordFrame = function() {
    drawSetup();
    
    for (var i = 0; i < frameDrawingX.length; i++) {
        if (brushMode) {
            fill(brushColor);
        } else {
            fill(255);
        }
        noStroke();
        ellipse(frameDrawingX[i], frameDrawingY[i], brushSize, brushSize);
    }
    
    frameDrawingX = [];
    frameDrawingY = [];
    thisFrame = get(25, 25, 350, 350);
    
    animationFrames.push(thisFrame);
    
};


var drawShadow = function() {
    background(255);
    drawSetup();
    tint(255, 100);
    
    
    image(animationFrames[numOfFrames], 25, 25, 350, 350);
    
    numOfFrames++;
    drawText();
};



var draw = function() {
    if (playback) {
        playbackAnimation();
    } else {
        frameRate(60);
    }
};


var keyPressed = function() {
    if (keyCode === RIGHT) {
        recordFrame();
        drawShadow();
    }
    
    if (keyCode === 69) {
        brushMode = false;
    }
    
    if (keyCode === 66) {
        brushMode = true;
    }
    
    if (keyCode === 38) {
        brushSize++;
    }
    if (keyCode === 40) {
        brushSize--;
    }
    
    if (key === ' ') {
        playback = true;
    }
};

var mouseDragged = function() {
    if (mouseX > 25 && mouseX < 375 && mouseY > 25 && mouseY < 375) {
        frameDrawingX.push(mouseX);
        frameDrawingY.push(mouseY);
        
        noStroke();
        if (brushMode) {
            fill(brushColor);
        } else {
            fill(255);
            drawShadow();
        }
        ellipse(mouseX, mouseY, brushSize, brushSize);
    }
};

var mouseClicked = function() {
    if (mouseX >= 52 && mouseX <= 68 && mouseY >= 2 && mouseY <= 18) {
        brushColor = color(0);
    }
    if (mouseX >= 72 && mouseX <= 88 && mouseY >= 2 && mouseY <= 18) {
        brushColor = color(255, 0, 0);
    }
    if (mouseX >= 92 && mouseX <= 108 && mouseY >= 2 && mouseY <= 18) {
        brushColor = color(0, 0, 255);
    }
};