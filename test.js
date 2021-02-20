const Upscaler = require('./dist/index').default;
const fs = require('fs');
const upscaler = new Upscaler();
upscaler
  .upscale('./assets/baboon.png')
  .then((upscaledImage) => {
    console.log('Writing!');
    fs.writeFileSync(
      './upscaled-' + new Date().getTime().toString() + '.png',
      upscaledImage,
    );
  })
  .catch(console.error);
