import Papa from 'papaparse';
import { useEffect, useState } from "react";
import './App.css';
import loadImages from './imageLoader';

const CardGenerator = () => {
  const [numCards, setNumCards] = useState(18);
  const [cardWidth, setCardWidth] = useState(3.4);
  const [cardHeight, setCardHeight] = useState(2.1);
  const [cardColor, setCardColor] = useState("#f0f0f0");
  const [borderColor, setBorderColor] = useState("#000");
  const [templateType, setTemplateType] = useState("image");
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("in");
  const [direction, setDirection] = useState("ltr");

  const convertToInches = (value) => unit === "cm" ? value / 2.54 : value;

  const handleWidthChange = (e) => setCardWidth(convertToInches(parseFloat(e.target.value) || 0));
  const handleHeightChange = (e) => setCardHeight(convertToInches(parseFloat(e.target.value) || 0));

  const displayWidth = unit === "cm" ? (cardWidth * 2.54).toFixed(2) : cardWidth;
  const displayHeight = unit === "cm" ? (cardHeight * 2.54).toFixed(2) : cardHeight;

  useEffect(() => {
    fetch('/aws4.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        const sortedData = result.data.sort((a, b) => {
          const nameA = (a.title || '').toUpperCase();
          const nameB = (b.title || '').toUpperCase();
          return nameA.localeCompare(nameB);
        });
        setCsvData(sortedData);
      })
      .catch((error) => console.error('CSV load error:', error))
      .finally(() => setLoading(false));
  }, []);

  const images = loadImages();

  const getCardImage = (category, imageName) => {
    if (!imageName) return '/images/default-image.jpg';
    return `/images/${category}/${imageName}.png`;
  };

  if (loading) return <div>Loading...</div>;

  return (

    


    <div>
      <div className="no-print">
      <header className="app-header">
        <h1>Card Generator</h1>
        <p>Create and print beautiful cards with custom styles & images.</p>
      </header>
      </div>
      <div className="no-print">


        <label>
          Number of Cards:
          <input type="number" value={numCards} onChange={(e) => setNumCards(parseInt(e.target.value) || 1)} />
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
          <input type="number" step="0.1" value={displayWidth} onChange={handleWidthChange} />
        </label>
        <label>
          Card Height ({unit}):
          <input type="number" step="0.1" value={displayHeight} onChange={handleHeightChange} />
        </label>
        <label>
          Background Color:
          <input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} />
        </label>
        <label>
          Border Color:
          <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
        </label>
        <label>
          Select Template:
          <select value={templateType} onChange={(e) => setTemplateType(e.target.value)}>
            <option value="image">Image</option>
            <option value="text">Text</option>
          </select>
        </label>
        <label>
          Direction:
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="ltr">Left to Right</option>
            <option value="rtl">Right to Left</option>
          </select>
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
          direction: direction,
        }}
      >
        {csvData.slice(0, numCards).map((data, index) => (
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
              overflow: "hidden",
              flexDirection: "column",
            }}
          >
            {templateType === "image" ? (
              <>
                <img
                  src={getCardImage(data.cathegory, data.filename)}
                  alt={data.filename}
                  onError={(e) => (e.target.src = "/images/broken-image.png")}
                  style={{
                    maxWidth: "90%",
                    maxHeight: "60%",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <div className="title" style={{ color: `#${data.color?.replace('#', '')}` }}>
                  {data.filename?.split('.')[0].replace(/-/g, ' ') || "Unnamed"}
                </div>
              </>
            ) : (
              <>
                <div className="title" style={{ color: `#${data.color?.replace('#', '')}` }}>
                  {data.title || "No Title"}
                </div>
                <div className="description" style={{ direction: "ltr", unicodeBidi: "plaintext" }}>
                  {data.description || "No description available."}
                </div>
              </>
            )}

            {/* Corners */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
              const styles = {
                position: "absolute",
                width: "10px",
                height: "10px",
                border: `1px solid ${borderColor}`,
              };
              switch (corner) {
                case "top-left":
                  return <div key={corner} style={{ ...styles, top: 0, left: 0, borderBottom: 0, borderRight: 0 }} />;
                case "top-right":
                  return <div key={corner} style={{ ...styles, top: 0, right: 0, borderBottom: 0, borderLeft: 0 }} />;
                case "bottom-left":
                  return <div key={corner} style={{ ...styles, bottom: 0, left: 0, borderTop: 0, borderRight: 0 }} />;
                case "bottom-right":
                  return <div key={corner} style={{ ...styles, bottom: 0, right: 0, borderTop: 0, borderLeft: 0 }} />;
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGenerator;
