import '../App.css';

const LeftMenu = ({
  numCards, setNumCards,
  cardWidth, setCardWidth,
  cardHeight, setCardHeight,
  cardColor, setCardColor,
  borderColor, setBorderColor,
  templateType, setTemplateType,
  unit, setUnit,
  direction, setDirection,
  cardsPerRow, setCardsPerRow
}) => {
  const convertToInches = (value) => unit === "cm" ? value / 2.54 : value;
  const displayWidth = unit === "cm" ? (cardWidth * 2.54).toFixed(2) : cardWidth;
  const displayHeight = unit === "cm" ? (cardHeight * 2.54).toFixed(2) : cardHeight;

  const predefinedSizes = {
    poker: { width: 2.5, height: 3.5 },
    bridge: { width: 2.25, height: 3.5 },
    mini: { width: 1.75, height: 2.5 },
    jumbo: { width: 3.5, height: 5 },
    tarot: { width: 2.75, height: 4.75 },
    square: { width: 2.5, height: 2.5 },
  };

  return (
    <div className="left-menu no-print">
      <h3>Settings</h3>


      <label>
  Cards per Row:
  <input
    type="number"
    value={cardsPerRow}
    min={1}
    max={10}
    onChange={(e) => setCardsPerRow(parseInt(e.target.value))}
  />
</label>



      <label>
        Number of Cards:
        <input type="number" value={numCards} onChange={(e) => setNumCards(parseInt(e.target.value))} />
      </label>
      <br />

      <label>
        Predefined Card Size:
        <select onChange={(e) => {
          const size = predefinedSizes[e.target.value];
          if (size) {
            setCardWidth(size.width);
            setCardHeight(size.height);
          }
        }}>
          <option value="">-- Select Size --</option>
          {Object.keys(predefinedSizes).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Unit:
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="in">inches</option>
          <option value="cm">centimeters</option>
        </select>
      </label>
      <br />

      <label>
        Card Width ({unit}):
        <input type="number" step="0.1" value={displayWidth} onChange={(e) => setCardWidth(convertToInches(parseFloat(e.target.value)))} />
      </label>
      <br />

      <label>
        Card Height ({unit}):
        <input type="number" step="0.1" value={displayHeight} onChange={(e) => setCardHeight(convertToInches(parseFloat(e.target.value)))} />
      </label>
      <br />

      <button onClick={() => {
        setCardWidth(cardHeight);
        setCardHeight(cardWidth);
      }}>↔️ Invert Dimensions</button>

      <br />
      <label>
        Background Color:
        <input type="color" value={cardColor} onChange={(e) => setCardColor(e.target.value)} />
      </label>
      <br />
      <label>
        Border Color:
        <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
      </label>
      <br />
      <label>
        Template Type:
        <select value={templateType} onChange={(e) => setTemplateType(e.target.value)}>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
      </label>
      <br />
      <label>
        Direction:
        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="ltr">Left to Right</option>
          <option value="rtl">Right to Left</option>
        </select>
      </label>
    </div>
  );
};

export default LeftMenu;
  