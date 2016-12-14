

var fishSprite;
var backgroundSprite;
var foregroundSprite;
var bottomKillerSprite;
var topKillerSprite;

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

    backgroundSprite = new Sprite(img, 4, 380,2000, 1000);
    foregroundSprite = new Sprite(img, 2, 250, 310, 80);

    bottomKillerSprite = new Sprite(img, 990, 30, 130,300);
    topKillerSprite = new Sprite(img, 990, 30, 130,300);
}
