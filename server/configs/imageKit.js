import ImageKit from "@imagekit/nodejs";

const ImageKit = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

export default ImageKit;
