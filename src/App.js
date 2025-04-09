import React, { useState } from "react";
import './App.css';
import myCard from './template-front.png';

const CardGenerator = () => {
  const [numCards, setNumCards] = useState(18);
  const [cardWidth, setCardWidth] = useState(3.4);
  const [cardHeight, setCardHeight] = useState(2.1);
  const [cardColor, setCardColor] = useState("#f0f0f0");
  const [borderColor, setBorderColor] = useState("#000");
  const [unit, setUnit] = useState("in"); // 'in' or 'cm'

  const cards = Array.from({ length: numCards }, (_, index) => `Card ${index + 1}`);

  const convertToInches = (value) => unit === "cm" ? value / 2.54 : value;

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
      </div>

      <div
        className="cards-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${cardWidth}in)`,
          gap: "0px",
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
              boxSizing: "border-box",
              overflow: "hidden",
              flexDirection: "column",
            }}
          >
            <img
              src={myCard}
              alt={text}
              style={{
                maxWidth: "90%",
                maxHeight: "70%",
                objectFit: "contain",
              }}
            />
            <p>{text}</p>
            {/* Corners */}
            {["TopLeft", "TopRight", "BottomLeft", "BottomRight"].map((corner) => {
              const isTop = corner.includes("Top");
              const isLeft = corner.includes("Left");
              return (
                <div
                  key={corner}
                  style={{
                    position: "absolute",
                    [isTop ? "top" : "bottom"]: 0,
                    [isLeft ? "left" : "right"]: 0,
                    width: "10px",
                    height: "10px",
                    borderTop: isTop ? `1px solid ${borderColor}` : "none",
                    borderBottom: !isTop ? `1px solid ${borderColor}` : "none",
                    borderLeft: isLeft ? `1px solid ${borderColor}` : "none",
                    borderRight: !isLeft ? `1px solid ${borderColor}` : "none",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGenerator;
