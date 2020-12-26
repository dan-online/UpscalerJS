const Upscaler = require('./dist/index').default;
console.log(Upscaler);
const fs = require('fs');
const upscaler = new Upscaler();
console.log(upscaler);
upscaler
  .upscale('./assets/baboon.png')
  .then((upscaledImage) => {
    console.log('Writing!');
    fs.writeFileSync('./upscaled.png', upscaledImage);
  })
  .catch(console.error);
