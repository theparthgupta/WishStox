import React from 'react';

interface GlowingCardProps {
  AccentColor: string;
  BackgroundColor: string;
  TextColor: string;
  BorderRadius: string;
  BorderWidth: string | number;
  Icon: React.ReactNode;
  IconHeight?: string | number;
  TopTextSize?: string | number;
  TopInscription: string;
  BigInscription: string;
  SmallInscription: string;
  learnMoreLink?: string; // Link to open on bottom inscription click
  width?: string | number;
  height?: string | number;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  AccentColor,
  BackgroundColor,
  TextColor,
  BorderRadius,
  BorderWidth,
  Icon,
  IconHeight = "40px",
  TopTextSize = "20px",
  TopInscription,
  BigInscription,
  SmallInscription,
  learnMoreLink,
  width = "387px",
  height = "467px",
}) => {
  
  // Calculate dimensions based on container size
  const baseWidth = parseFloat(width as string);
  const baseHeight = parseFloat(height as string);

  const desiredPaddingTopBottom = (31 / baseHeight) * baseHeight; // Proportional padding based on height
  const desiredPaddingLeftRight = (39 / baseWidth) * baseWidth; // Proportional padding based on width

  const cardRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const card = cardRef.current;
    const text = textRef.current;
    const handleMouseOver = () => {
      if (cardRef.current && textRef.current) {
        cardRef.current.style.backgroundColor = AccentColor;
        cardRef.current.style.boxShadow = `0 0 5px ${AccentColor}, 
        0 0 25px ${AccentColor}, 
        0 0 50px ${AccentColor}, 
        0 0 200px ${AccentColor}`;
        if (textRef.current) {
          textRef.current.style.color = BackgroundColor;
        }
      }
    };
    const handleMouseOut = () => {
      if (card && text) {
        card.style.backgroundColor = BackgroundColor;
        card.style.boxShadow = 'none';
        text.style.color = TextColor;
      }
    };
    // Initialize the styles
    handleMouseOut();
    if (card) {
      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mouseout', handleMouseOut);
    }
    return () => {
      if (card) {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [AccentColor, BackgroundColor, TextColor]);  

  return (
    <div
      ref={cardRef}
      style={{
        width: width,
        height: height,
        borderWidth: BorderWidth,
        borderColor: AccentColor,
        borderRadius: BorderRadius,
        transition: 'background-color 0.3s, box-shadow 0.3s',
        backgroundColor: BackgroundColor,
        display: 'flex',
        flexDirection: 'column',
      }}
      className="overflow-hidden shadow-lg"
    >
      <div 
          ref={textRef} 
          style={{ 
              padding: `${desiredPaddingTopBottom}px ${desiredPaddingLeftRight}px`,
              flexGrow: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
              transition: 'color 0.3s',
          }} 
          className="font-family-Montserrat"
      >
        {/* Icon above TopInscription */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          {Icon && (
            <div style={{ fontSize: IconHeight, marginBottom: '6px' }}>
              {Icon}
            </div>
          )}
          <span style={{ fontSize: TopTextSize, fontWeight: 'bold', marginBottom: '5px' }}>
            {TopInscription}
          </span>
        </div>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0 0 8px 0', lineHeight: 1.1 }}>
          {BigInscription}
        </h1>
        <h3 style={{ fontSize: '1rem', fontWeight: '500', margin: '0 0 12px 0', color: '#f0f0f0', lineHeight: 1.2 }}>
          {SmallInscription}
        </h3>
        <p
          style={{
              marginTop: 'auto',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: AccentColor,
              cursor: learnMoreLink ? 'pointer' : 'default',
          }}
      >
      </p>
      </div>
    </div>
);
};

export default GlowingCard;