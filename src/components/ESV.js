import React, { useState } from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import '../App.css'

function ESV({ verseData }) {
  const [isSummarized, setIsSummarized] = useState(false);
  const [textClassName, setTextClassName] = useState('normal-text');

  // Handle potential loading or error states
  if (!verseData) {
    return <p className='mt-5'>Loading...</p>;
  }

  const formattedText = verseData.serverResponse[1]
    .slice(verseData.serverResponse[1].indexOf("[") - 1)
    .split(/\(ESV\)|\bFootnotes\b/)[0] // Split on "(ESV)" or "Footnotes"
    .trim();


  const summarizedText = formattedText.split(/\s+/).map((word) => {
    // Use 4 letters for words starting with "[" or 1 letter for others
    return word.startsWith("[") ? word.slice(0, 4) : word.charAt(0);
  }).join(" ");

  const textToDisplay = isSummarized ? (
    <p className={textClassName}>{summarizedText.toUpperCase()}</p>
  ) : (
    <p className={textClassName}>{formattedText}</p>
  );

  return (
    <Container>
      <Row className='mt-5 mb-2'>
        <Card>
          <Card.Body>
            <Card.Text>
              <Card.Title><h3>{verseData.serverResponse[0]}</h3></Card.Title>
              <hr />
              {textToDisplay}
            </Card.Text>
            <Button
              variant="outline-dark"
              onClick={() => {
                setIsSummarized(!isSummarized);
                setTextClassName(isSummarized ? 'normal-text' : 'summarized-text');
              }}
            >
              {isSummarized ? 'Normal Text' : 'Memorize'}
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default ESV;
