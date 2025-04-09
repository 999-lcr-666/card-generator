import React, { useState } from "react";
import './App.css';
import myCardImage from './template-front.png';

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
                src={myCardImage}
                alt={text}
                style={{
                  maxWidth: "90%",
                  maxHeight: "60%",
                  objectFit: "contain",
                  marginBottom: "10px", // Ensure some space between image and title
                }}
              />
              <h3 style={{ color: "red", textAlign: "center" }}>{text}</h3>
            </>
            ) : (
              <>
                <h3 style={{ color: "red", textAlign: "center" }}>{text}</h3>
                <p style={{ textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut interdum mi. 
                  Vestibulum in leo vel tortor facilisis pharetra ut nec ante.
                </p>
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
