export const s = (sketch) => {
  let cover;
  let logo;
  let c;
  let colorPickerColor;
  let showLogo = false;
  let showTint = false;

  sketch.setup = () => {
    c = sketch.createCanvas(3000, 3000);
    c.parent('canvas');
    c.drop(gotFile);

    manageUIElements();

    sketch.imageMode(sketch.CENTER);

    initialDraw();

  };
  
  function initialDraw() {
    const coverData = sketch.getItem('coverData');
    const logoData = sketch.getItem('logoData');

    if (coverData === null) {
      sketch.background(255);
      sketch.textSize(200);
      sketch.text(
        'Drop image or paste URL, them choose color with color picker an click "Generate Cover"',
        100, 500, sketch.width - 100, sketch.height - 100
      );
    } else {
      if (coverData) {
        console.log(coverData);
        
        cover = sketch.loadImage(URL.createObjectURL(coverData), imageReady);
      }

      if (logoData) {
        logo = sketch.loadImage(URL.createObjectURL(logoData), imageReady);
      }
      drawCover();
    }
  }

  function manageUIElements() {
    const coverloader = document.querySelector('#cover-input');
    coverloader.addEventListener('change', insertCoverFromInput);

    const logoloader = document.querySelector('#logo-input');
    logoloader.addEventListener('change', insertLogoFromInput);

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
    if (cover) {
      if (showTint) {
        cover.filter(sketch.GRAY);
      }

      // Check the aspect ratio of the image
      if (cover.height > cover.width) {
        cover.resize(sketch.width, 0);
      } else {
        cover.resize(0, sketch.height);
      }

      if (showTint) {
        sketch.tint(colorPickerColor);
      }

      sketch.image(cover, sketch.width / 2, sketch.height / 2);
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

  function insertCoverFromInput(file) {
    const data = file.target.files[0];
    console.log(data);
    
    cover = sketch.loadImage(URL.createObjectURL(data), imageReady);
    console.log(data);
    sketch.storeItem('coverData', data);
  }

  function insertLogoFromInput(file) {
    const data = file.target.files[0];
    logo = sketch.loadImage(URL.createObjectURL(data), imageReady);
    sketch.storeItem('logoData', data);
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
      cover = sketch.loadImage(file.data, imageReady);
    } else {
      console.log('Not an image file!');
    }
  }
};