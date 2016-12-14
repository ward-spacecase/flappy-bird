var canvas,
    bird,
    renderingContext,
    width,
    states = {Splash: 0, Game: 1, Score: 2},
    height,
    score,
    frames = 0,
    killerObjects,
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
        }
        else {
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

function KillerCollection() {

    this._killers = [];

    this.reset = function() {
        this._killers = [];
    };

    this.add = function() {
        console.log('Add KillerObject ' + frames);
        this._killers.push(new KillerObject());
    };

    this.update = function() {

        if(frames % 100 === 0) {
            this.add();

        }

        for(var i = 0, len = this._killers.length; i < len; i++) {
            var killer = this._killers[i];

            killer.detectCollision();
            killer.x -= 4;
            if(killer.x < killer.width - 200) {
                this._killers.splice(i, 1);
                i--;
                len--;
                score++;
            }
        }

    };

    this.draw = function() {
        for(var i = 0, len = this._killers.length; i < len; i++) {
            var killer = this._killers[i];
            killer.draw();

        }
    }

}

function KillerObject() {

    this.x = 1400;
    this.y = height - (bottomKillerSprite.height + foregroundSprite.height +220 + 200 * Math.random());


    this.width = bottomKillerSprite.width;
    this.height = bottomKillerSprite.height;

    this.detectCollision = function () {

        var cx  = Math.min(Math.max(bird.x, this.x), this.x+this.width);
        var cy1 = Math.min(Math.max(bird.y, this.y), this.y+this.height);
        var cy2 = Math.min(Math.max(bird.y, this.y+this.height+80), this.y+2*this.height+80);
        // closest difference
        var dx  = bird.x - cx;
        var dy1 = bird.y - cy1;
        var dy2 = bird.y - cy2;
        // vector length
        var d1 = dx*dx + dy1*dy1;
        var d2 = dx*dx + dy2*dy2;
        var r = bird.radius*bird.radius;
        // determine intersection
        if (r > d1 || r > d2) {

            currentState = states.Score;

        }


    };

    this.draw = function () {
        bottomKillerSprite.draw(renderingContext, this.x, this.y);
        topKillerSprite.draw(renderingContext, this.x, this.y + 210 + this.height);
    };
}

function main() {
                        //initalizes game
    bird = new Bird();  //new Bird character Object
    killerObjects = new KillerCollection();
    windowSetup();      //setup the window
    canvasSetup();      //setup Canvas
    loadGraphics();     //load character, background...
    score = 0;
    currentState = states.Splash;        //set state to splash (dorment state)
    document.body.appendChild(canvas);      //adds created canvans to DOM
    $('body').append('<span id="score">' + score + '</span>');


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
    img.src = "src/image/spritesheet2.png";
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
    $('#score').html(score);
    frames++;

    bird.update();

    if(currentState != states.Score){
        foregroundPosition = (foregroundPosition - 2) % 14;
    }
    if(currentState == states.Game) {
        killerObjects.update();
    }
}

function render() {

    renderingContext.fillRect(0,0, width, height);
    backgroundSprite.draw(renderingContext, 0, 0 );

    killerObjects.draw(renderingContext);

    bird.draw(renderingContext);

    //draw foreground
    foregroundSprite.draw(renderingContext, foregroundPosition, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width*2, height - foregroundSprite.height);
    foregroundSprite.draw(renderingContext, foregroundPosition + foregroundSprite.width*3, height - foregroundSprite.height);




}