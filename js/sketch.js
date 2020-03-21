export const s = (sketch) => {
  let c, cover, logo, colorPickerColor;

  let showLogo = false;
  let showTint = false;

  // Variables for storage
  let coverData, logoData, showTintData, showLogoData, colorPickerColorData;

  sketch.setup = () => {
    c = sketch.createCanvas(3000, 3000);
    c.parent('canvas');
    c.drop(gotFile);

    
    sketch.imageMode(sketch.CENTER);
    
    getDataFromStorage();
    manageUIElements();
    initialDraw();

  };

  function manageUIElements() {
    const coverloader = document.querySelector('#cover-input');
    coverloader.addEventListener('change', insertCoverFromInput);

    const logoloader = document.querySelector('#logo-input');
    logoloader.addEventListener('change', insertLogoFromInput);

    let colorPicker = document.querySelector('#color-input');
    if (colorPickerColor === undefined) colorPickerColor = sketch.color(255,100,50);
    colorPicker.value = colorPickerColor.toString('#rrggbb');
    colorPicker.addEventListener('change', getColorPickerColor);

    let showTintCheckbox = document.querySelector('#showTint');
    showTintCheckbox.checked = showTint;
    showTintCheckbox.addEventListener('change', tintCheckboxChanged);

    let showLogoCheckbox = document.querySelector('#showLogoCheckbox');
    showLogoCheckbox.checked = showLogo;
    showLogoCheckbox.addEventListener('change', logoCheckboxChanged);

    const generateButton = document.querySelector('#generate-button');
    generateButton.addEventListener('click', generateCover);
  }

  function getDataFromStorage() {
    coverData = sketch.getItem('coverData');
    logoData = sketch.getItem('logoData');
    showTintData = sketch.getItem('showTintData');
    showLogoData = sketch.getItem('showLogoData');
    colorPickerColorData = sketch.getItem('colorPickerColorData');

    if (coverData) cover = sketch.loadImage(coverData, imageReady);
    if (logoData) logo = sketch.loadImage(logoData, imageReady);
    if (showTintData) {
      showTint = showTintData;
      manageColorPickerVisibility();
    }
      
    if (showLogoData) showLogo = showLogoData;
    if (colorPickerColorData) colorPickerColor = colorPickerColorData;
  }
  
  function initialDraw() {
    if (coverData === null) {
      sketch.background(255);
      sketch.textSize(200);
      sketch.text(
        'Drop image or paste URL, them choose color with color picker an click "Generate Cover"',
        100, 500, sketch.width - 100, sketch.height - 100
      );
    } else {
      drawCover();
    }
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
        sketch.tint(colorPickerColor)
      }

      // Check the aspect ratio of the image
      if (cover.height > cover.width) {
        cover.resize(sketch.width, 0);
      } else {
        cover.resize(0, sketch.height);
      }

      sketch.image(cover, sketch.width / 2, sketch.height / 2);      
    } else {
      sketch.background(255);
    }

    sketch.noTint();

    if (showLogo && logo) {
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
    const data = URL.createObjectURL(file.target.files[0]);
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      sketch.storeItem('coverData', reader.result);
    }, false);

    reader.readAsDataURL(file.target.files[0]);
    cover = sketch.loadImage(data, imageReady);
  }

  function insertLogoFromInput(file) {
    const data = URL.createObjectURL(file.target.files[0]);
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      sketch.storeItem('logoData', reader.result);
    }, false);

    reader.readAsDataURL(file.target.files[0]);
    logo = sketch.loadImage(data, imageReady);

    document.querySelector('#showLogoCheckbox').checked = true;

    showLogo = true;
    sketch.storeItem('showLogoData', showLogo);
  }

  function getColorPickerColor(e) {
    colorPickerColor = e.target.value;
    sketch.storeItem('colorPickerColorData', colorPickerColor);
    drawCover();
  }

  function logoCheckboxChanged() {
    showLogo = !showLogo;
    sketch.storeItem('showLogoData', showLogo);
    drawCover();
  }

  function tintCheckboxChanged() {
    showTint = !showTint;
    sketch.storeItem('showTintData', showTint);
    manageColorPickerVisibility();
    drawCover();
  }

  function manageColorPickerVisibility() {
    document.querySelector('.controls__color').classList.toggle('hide');
  }

  function gotFile(file) {
    if (file.type === 'image') {
      cover = sketch.loadImage(file.data, imageReady);
    } else {
      console.log('Not an image file!');
    }
  }
};