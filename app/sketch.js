let imageURL = '';
let img;
let logo;
let c;
let colorPickerColor;
let showLogo = true;
let showTint = true;

function preload() {
    logo = loadImage('./img/logo.png');
}

function setup() { 
    c = createCanvas(3000, 3000);
    c.parent('canvas');
    c.drop(gotFile);
  
    manageUIElements();

    imageMode(CENTER);
  } 

  function manageUIElements() {
    const loadCoverButton = document.querySelector('#load-cover');
    loadCoverButton.addEventListener('click', insertCoverFromInput); 

    const loadLogoButton = document.querySelector('#load-logo');
    loadLogoButton.addEventListener('click', insertLogoFromInput); 

    const colorPicker = document.querySelector('#color-input');    
    colorPickerColor = colorPicker.value
    colorPicker.addEventListener('change', getColorPickerColor);

    const showTint = document.querySelector('#showTint');
    showTint.addEventListener('change', tintCheckboxChanged);

    const showLogoCheckbox = document.querySelector('#showLogoCheckbox');
    showLogoCheckbox.addEventListener('change', logoCheckboxChanged);

    const generateButton = document.querySelector('#generate-button');
    generateButton.addEventListener('click', generateCover);

  }
  
  function draw() {
    background(255);
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
    clear();
    if (img) {
      if (showTint) {
        img.filter(GRAY);
      }
      
      // Check the aspect ratio of the image
      if (img.height > img.width) {
        img.resize(width, 0);
      } else {
        img.resize(0, height);
      }
  
      if (showTint) {
        tint(colorPickerColor);
      }
  
      image(img, width/2, height/2);
    }

    noTint();
    if (showLogo) {
      if (logo.height < logo.width) {
        logo.resize(width-300, 0);
      } else {
        logo.resize(0, height-300);
      }
      image(logo,width/2, height/2,);
    }
  }

  function imageReady() {
    document.querySelector('.controls__modifier').classList.remove('hide');
    drawCover();
  }

  function insertCoverFromInput(e) {
    const val = e.target.parentNode.querySelector('input').value;

    img = loadImage(val, imageReady);
  }

  function insertLogoFromInput(e) {
    const val = e.target.parentNode.querySelector('input').value;

    logo = loadImage(val, imageReady);
  }

  function getColorPickerColor(e){    
    colorPickerColor = e.target.value;
    drawCover();
  }

  function logoCheckboxChanged() {
    showLogo = !showLogo;
    drawCover();
  }

  function tintCheckboxChanged() {
    showTint = !showTint;
    drawCover();
  }

  function gotFile(file) {
    if (file.type === 'image') {
      img = loadImage(file.data, imageReady);
    } else {
      console.log('Not an image file!');
    }
  }