// src/imageLoader.js

const loadImages = () => {
    const images = [];
    const imageContext = require.context('../public/images', false, /\.(jpg|jpeg|png|gif)$/); // Adjust file types as needed
  
    imageContext.keys().forEach((fileName) => {
      images.push({
        fileName: fileName.replace('./', ''), // Get file name
        src: imageContext(fileName), // Get the image source
      });
    });
  
    // Sort images alphabetically by file name
    images.sort((a, b) => a.fileName.localeCompare(b.fileName));
    return images;
  };
  
  export default loadImages;
  