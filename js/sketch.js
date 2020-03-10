export const s = (sketch) => {
  let img;
  let logo;
  let c;
  let colorPickerColor;
  let showLogo = true;
  let showTint = true;

  sketch.preload = () => {
    logo = sketch.loadImage('./img/logo.png');
  };

  sketch.setup = () => {
    c = sketch.createCanvas(3000, 3000);
    c.parent('canvas');
    c.drop(gotFile);

    manageUIElements();

    sketch.imageMode(sketch.CENTER);

    sketch.background(255);
    sketch.textSize(200);
    sketch.text(
      'Drop image or paste URL, them choose color with color picker an click "Generate Cover"',
      100, 500, sketch.width - 100, sketch.height - 100
    );
  };

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

  sketch.draw = () => {
    sketch.noLoop();
  }

  function generateCover() {
    sketch.saveCanvas(c, 'cover', 'jpg');
  }

  function drawCover() {
    sketch.clear();
    if (img) {
      if (showTint) {
        img.filter(sketch.GRAY);
      }

      // Check the aspect ratio of the image
      if (img.height > img.width) {
        img.resize(sketch.width, 0);
      } else {
        img.resize(0, sketch.height);
      }

      if (showTint) {
        sketch.tint(colorPickerColor);
      }

      sketch.image(img, sketch.width / 2, sketch.height / 2);
    }

    sketch.noTint();

    if (showLogo) {
      if (logo.height < logo.width) {
        logo.resize(sketch.width - 300, 0);
      } else {
        logo.resize(0, sketch.height - 300);
      }
      sketch.image(logo, sketch.width / 2, sketch.height / 2);
    }
  }

  function imageReady() {
    document.querySelector('.controls__modifier').classList.remove('hide');
    drawCover();
  }

  function insertCoverFromInput(e) {
    const val = e.target.parentNode.querySelector('input').value;

    img = sketch.loadImage(val, imageReady);
  }

  function insertLogoFromInput(e) {
    const val = e.target.parentNode.querySelector('input').value;

    logo = sketch.loadImage(val, imageReady);
  }

  function getColorPickerColor(e) {
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
      img = sketch.loadImage(file.data, imageReady);
    } else {
      console.log('Not an image file!');
    }
  }
};