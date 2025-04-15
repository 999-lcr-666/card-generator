import '../App.css';

const getCardImage = (category, imageName) => {
    if (!imageName) return '/images/default-image.jpg';
    return `/images/${category}/${imageName}.png`;
  };
  
  const Card = ({ data, cardWidth, cardHeight, cardColor, borderColor, templateType }) => (
  
    <div
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
            style={{ maxWidth: "90%", maxHeight: "60%", objectFit: "contain", marginBottom: "10px" }}
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
  
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
        const styles = {
          position: "absolute",
          width: "10px",
          height: "10px",
          border: `1px solid ${borderColor}`,
        };
        switch (corner) {
          case "top-left": return <div key={corner} style={{ ...styles, top: 0, left: 0, borderBottom: 0, borderRight: 0 }} />;
          case "top-right": return <div key={corner} style={{ ...styles, top: 0, right: 0, borderBottom: 0, borderLeft: 0 }} />;
          case "bottom-left": return <div key={corner} style={{ ...styles, bottom: 0, left: 0, borderTop: 0, borderRight: 0 }} />;
          case "bottom-right": return <div key={corner} style={{ ...styles, bottom: 0, right: 0, borderTop: 0, borderLeft: 0 }} />;
          default: return null;
        }
      })}
    </div>
  );
  
  export default Card;
  