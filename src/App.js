// App.js
import './App.css';
import { useEffect, useState } from "react";
import Papa from "papaparse";
import MainPage from "./components/MainPage";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";


const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [numCards, setNumCards] = useState(18);
  const [cardWidth, setCardWidth] = useState(3.4);
  const [cardHeight, setCardHeight] = useState(2.1);
  const [cardColor, setCardColor] = useState("#f0f0f0");
  const [borderColor, setBorderColor] = useState("#000");
  const [templateType, setTemplateType] = useState("image");
  const [unit, setUnit] = useState("in");
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    fetch('/aws4.csv')
      .then((res) => res.text())
      .then((text) => {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        setCsvData(result.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container" style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div className="content-wrapper" style={{ display: "flex" }}>
        <LeftMenu
          numCards={numCards}
          setNumCards={setNumCards}
          cardWidth={cardWidth}
          setCardWidth={setCardWidth}
          cardHeight={cardHeight}
          setCardHeight={setCardHeight}
          cardColor={cardColor}
          setCardColor={setCardColor}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          templateType={templateType}
          setTemplateType={setTemplateType}
          unit={unit}
          setUnit={setUnit}
          direction={direction}
          setDirection={setDirection}
        />
        <MainPage
          csvData={csvData}
          numCards={numCards}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          cardColor={cardColor}
          borderColor={borderColor}
          templateType={templateType}
          direction={direction}
        />
      </div>
    </div>
  );
};

export default App;