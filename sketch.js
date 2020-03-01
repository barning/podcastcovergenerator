let imageURL = '';
let img;
let logo;
let c;
let showLogo = true;

function preload() {
    logo = loadImage('./img/logo.png');
}

function setup() { 
    c = createCanvas(3000, 3000);

    let imageUrlDiv = createDiv();
    let additionalDiv = createDiv();

    additionalDiv.class('flex');

    inp = createInput('Paste URL of Image here');
    imageUrlDiv.child(inp);
    inp.input(inputTyping);

    button = createButton('Load Image');
    imageUrlDiv.child(button);
    button.mousePressed(insertImage);
    
    colorPicker = createColorPicker('#ec5f6b');
    additionalDiv.child(colorPicker);
    colorPicker.input(drawCover);
    
    checkbox = createCheckbox('Show Podcast Logo', true);
    additionalDiv.child(checkbox);
    checkbox.changed(logoCheckboxChanged);
    
    gererate = createButton('Generate Cover');
    gererate.mousePressed(generateCover);

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
    console.log('jo');
    
    clear();
    img.filter(GRAY);
    
    // Check the aspect ratio of the image
    if (img.height > img.width) {
      img.resize(width, 0);
    } else {
      img.resize(0, height);
    }

    tint(colorPicker.color());
    image(img, width/2, height/2);

    noTint();
    if (showLogo) {
      logo.resize(width, 0);
      image(logo,width/2, height/2,);
    }
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

  function logoCheckboxChanged() {
    showLogo = !showLogo;
    drawCover();
  }

  function gotFile(file) {
    if (file.type === 'image') {
      img = loadImage(file.data, imageReady);
    } else {
      console.log('Not an image file!');
    }
  }