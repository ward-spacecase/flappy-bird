var canvas,
    bird,
    renderingContext,
    width,
    states = {Splash: 0, Game: 1, Score: 2},
    height,
    frames = 0,
    currentState,
    foregroundPosition = 0;


function Bird() {
    this.frame = 0;
    this.animation = [0,1,2,3,4,5,4,3,2,1,0,6,6,6,6,6,6,6];
    this.x = 50;
    this.y = 50;
    this.rotation = 0;
    this.radius = 14;
    this.velocity = 0;

    this.gravity = 0.35;
    this._jump = 7.3;

    this.jump = function () {
        this.velocity = -this._jump;
    };

    this.update = function() {

        var n = currentState === states.Splash ? 10 : 5;

        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;

        if(currentState == states.Splash) {
            this.updateIdleBird();
        } else {
            this.updatePlayingBird();
        }
        if(currentState == states.Score) {

        }
    };

    this.updateIdleBird = function () {

        //       initial height 5 is wave height  changes speed, higher = slower
        //                 V    V                     V
        this.y = height - 380 + 10 * Math.cos(frames / 12);
    };

    this.updatePlayingBird = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y >= height - foregroundSprite.height-100 || this.y < -100) {           //-100 is for top fix
            if(this.y < -100){
                this.y = -100;
            }else {
                this.y = height - foregroundSprite.height - 100;
            }
            if(currentState == states.Game) {
                currentState = states.Score;
            }

            this.velocity = this._jump;
        }

        if(this.velocity >= this._jump) {

        }
    };

    this.draw = function() {
      renderingContext.save();

        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);

        var n = this.animation[this.frame];
        if(currentState == states.Score) {
            n=this.animation[12];
        }

        fishSprite[n].draw(renderingContext, 50, 50);

        renderingContext.restore();
    };
}


function main() {
                        //initalizes game
    bird = new Bird();  //new Bird character Object
    windowSetup();      //setup the window
    canvasSetup();      //setup Canvas
    loadGraphics();     //load character, background...

    currentState = states.Splash;        //set state to splash (dorment state)
    document.body.appendChild(canvas);      //adds created canvans to DOM


}

function windowSetup() {

    width = window.innerWidth;
    height = window.innerHeight;


    var inputEvent = "touchstart";
    if(width >= 500) {
        if(width >= 800) {
            width = 1080;
        } else {
            width = 880;
        }
        height = 630;
        inputEvent = "mousedown";
        $('canvas').css('margin','10px, auto');

    }

    document.addEventListener(inputEvent, onpress);

}



function onpress(evt) {

    switch(currentState){
        case states.Splash:
            currentState = states.Game;
            bird.jump();
            break;
        case states.Game:
            bird.jump();
            break;
        case states.Score:
            break;
    }
}

function canvasSetup() {
    canvas = document.createElement("canvas");

    canvas.style.border = "15px solid #382b1d";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

function loadGraphics() {
    var img = new Image();
    img.src = "src/image/bird.png";
    img.onload = function () {

        initSprites(this);
        gameLoop();
    };


}

function gameLoop() {
    update();
    render();

    window.requestAnimationFrame(gameLoop);
}

function update() {
    frames++;

    bird.update();

    if(currentState != states.Score){
        foregroundPosition = (foregroundPosition - 2) % 14;
    }
}

function render() {

    renderingContext.fillRect(0,0, width, height);
    backgroundSprite.draw(renderingContext, 0, 150);

    bird.draw(renderingContext);

    //draw foreground
    foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width*2, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width*3, height - foregroundSprite.height);
}