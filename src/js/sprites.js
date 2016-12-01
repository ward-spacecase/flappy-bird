

var fishSprite;
var backgroundSprite;
var foregroundSprite;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (renderingContext, x, y) {
  renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img) {
    fishSprite =[
        new Sprite(img, 0, 162, 80, 80),
        new Sprite(img, 83, 162, 80, 80),
        new Sprite(img, 166, 162, 80, 80),
         new Sprite(img, 249, 162, 80, 80),
         new Sprite(img, 249+83, 162, 80, 80),
         new Sprite(img, 249+166, 162, 80, 80),
         new Sprite(img, 166, 0, 80, 80)


    ];

    backgroundSprite = new Sprite(img, 0, 450,0, 0);
    foregroundSprite = new Sprite(img, 0, 250, 335, 80);
}
