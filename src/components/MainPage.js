import '../App.css';

import Card from './Cards';

const MainPage = ({
  csvData,
  numCards,
  cardWidth,
  cardHeight,
  cardColor,
  borderColor,
  templateType,
  direction,
  cardsPerRow
}) => {
  const getCardImage = (category, imageName) => {
    if (!imageName) return '/images/default-image.jpg';
    return `/images/${category}/${imageName}.png`;
  };

  return (

<div className="main-page-container">
<div className="scrollable-content">

    <div
      className="cards-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cardsPerRow}, ${cardWidth}in)`,
        width: `${cardsPerRow * cardWidth}in`,
        gap: "0px",
        margin: "0 auto",
        direction: direction,
      }}
    >
      {csvData.slice(0, numCards).map((data, index) => (
        <Card
        data={data}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        cardColor={cardColor}
        borderColor={borderColor}
        templateType={templateType}
        key={index}
        title={data.title || 'No Title'}
        description={data.description || 'No Description'}
        image={data.image} // optional: only if you're including images
      />
      ))}
    </div>

    </div>
    </div>

  );
};

export default MainPage;
