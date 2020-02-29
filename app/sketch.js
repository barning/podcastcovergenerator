let imageURL = '';
let img;
let logo;
let c;

function preload() {
    logo = loadImage('./img/logo.png');
}

function setup() { 
    c = createCanvas(3000, 3000);

    inp = createInput('');
    inp.input(inputTyping);

    button = createButton('Load Image');
    button.mousePressed(insertImage);

    gererate = createButton('Generate Cover');
    gererate.mousePressed(generateCover);

    colorPicker = createColorPicker('#ec5f6b');
    colorPicker.input(drawCover);

    c.drop(gotFile);

    imageMode(CENTER);
  } 
  
  function draw() {
    background(200);
    textSize(200);
    text(
      'Drop image or paste URL, them choose color with color picker an click "Generate Cover"',
      100,500,width-100, height-100
    );
    noLoop();
  }

  function generateCover() {
    saveCanvas(c, 'cover', 'jpg');
  }

  function drawCover() {
    img.filter(GRAY);
    img.resize(width, 0);
    tint(colorPicker.color());
    image(img, width/2, height/2);

    noTint();
    logo.resize(width, 0);
    image(logo,width/2, height/2,);
  }

  function imageReady() {
    drawCover();
  }

  function insertImage() {
    img = loadImage(imageURL, imageReady);  
  }

  function inputTyping() {
    imageURL = this.value();
  }

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    img = loadImage(file.data, imageReady);
  } else {
    console.log('Not an image file!');
  }
}