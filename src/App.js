import React, { useState } from "react";
import './App.css';
import myCardImage from './template-front.png';
import loadImages from './imageLoader';


const CardGenerator = () => {
  const [numCards, setNumCards] = useState(18);
  const [cardWidth, setCardWidth] = useState(3.4);
  const [cardHeight, setCardHeight] = useState(2.1);
  const [cardColor, setCardColor] = useState("#f0f0f0");
  const [borderColor, setBorderColor] = useState("#000");
  const [templateType, setTemplateType] = useState("image"); // "image" or "text"

  const cards = Array.from({ length: numCards }, (value, index) => `Card ${index + 1}`);

  const [unit, setUnit] = useState("in"); // 'in' or 'cm'

  const convertToInches = (value) => {
    return unit === "cm" ? value / 2.54 : value;
  };

  const handleWidthChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setCardWidth(convertToInches(val));
  };

  const handleHeightChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setCardHeight(convertToInches(val));
  };

  const displayWidth = unit === "cm" ? (cardWidth * 2.54).toFixed(2) : cardWidth;
  const displayHeight = unit === "cm" ? (cardHeight * 2.54).toFixed(2) : cardHeight;



  // Load the images
  const images = loadImages();
  console.log('Loaded images:', images);


  // Example of card data with image names
  // Create card data dynamically based on available images
  const cardData = images.map((image, index) => ({
    name: `Card ${index + 1}`,
    imageName: image?.fileName || 'default-image.jpg',  // Use a default image if no fileName
  }));
  console.log('Card Data:', cardData);


  // Function to get the image path
  const getCardImage = (imageName) => {
    // Log to see if imageName is what you expect
    console.log('Received imageName:', imageName);

    // Default fallback if imageName is not valid
    if (!imageName) {
      console.log('No image name provided, using default image.');
      return '/images/default-image.jpg';  // Your fallback image
    }

    // Generate the image path
    const imagePath = `/images/${imageName}`;
    console.log('Generated Image Path:', imagePath);
    return imagePath;
  };





  return (
    <div>
      <div className="no-print">
        <label>
          Number of Cards:
          <input
            type="number"
            value={numCards}
            onChange={(e) => setNumCards(parseInt(e.target.value) || 1)}
          />
        </label>
        <label>
          Unit:
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="in">inches</option>
            <option value="cm">centimeters</option>
          </select>
        </label>

        <label>
          Card Width ({unit}):
          <input
            type="number"
            step="0.1"
            value={displayWidth}
            onChange={handleWidthChange}
          />
        </label>

        <label>
          Card Height ({unit}):
          <input
            type="number"
            step="0.1"
            value={displayHeight}
            onChange={handleHeightChange}
          />
        </label>
        <label>
          Background Color:
          <input
            type="color"
            value={cardColor}
            onChange={(e) => setCardColor(e.target.value)}
          />
        </label>
        <label>
          Border Color:
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
        </label>

        <label>
          Select Template:
          <select value={templateType} onChange={(e) => setTemplateType(e.target.value)}>
            <option value="image">Image</option>
            <option value="text">Text</option>
          </select>
        </label>
      </div>

      <div
        className="cards-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${cardWidth}in)`,
          gridTemplateRows: `repeat(auto-fill, ${cardHeight}in)`,
          gap: "0px", // No gap between cards
          width: `${2 * cardWidth}in`,
          margin: "0 auto",
        }}
      >
        {cards.map((text, index) => (
          <div
            key={index}
            className="card"
            style={{
              width: `${cardWidth}in`,
              height: `${cardHeight}in`,
              backgroundColor: cardColor,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0px",
              boxSizing: "border-box",
              overflow: "hidden", // Ensure image fits
              flexDirection: "column",
            }}
          >
            {templateType === "image" ? (
              <>
                <img
                  src={getCardImage(cardData[index]?.imageName)} // Dynamically set image path
                  alt={cardData[index]?.name}
                  onError={(e) => (e.target.src = myCardImage)} // Fallback to broken image if error
                  style={{
                    maxWidth: "90%",
                    maxHeight: "60%",
                    objectFit: "contain",
                    marginBottom: "10px", // Ensure some space between image and title
                  }}
                />
                <div className="title">
                  {cardData[index]?.imageName.split('.')[0].replace(/-/g, ' ')} {/* Display image name without extension */}
                </div>
              </>
            ) : (
              <>
                <div className="title">Title</div>
                <div className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut interdum mi.
                  Vestibulum in leo vel tortor facilisis pharetra ut nec ante.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut interdum mi.
                  Vestibulum in leo vel tortor facilisis pharetra ut nec ante.
                </div>
              </>
            )}

            {/* Corner lines for printing */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "10px",
                height: "10px",
                borderTop: `1px solid ${borderColor}`,
                borderLeft: `1px solid ${borderColor}`,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "10px",
                height: "10px",
                borderTop: `1px solid ${borderColor}`,
                borderRight: `1px solid ${borderColor}`,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "10px",
                height: "10px",
                borderBottom: `1px solid ${borderColor}`,
                borderLeft: `1px solid ${borderColor}`,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "10px",
                height: "10px",
                borderBottom: `1px solid ${borderColor}`,
                borderRight: `1px solid ${borderColor}`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGenerator;
