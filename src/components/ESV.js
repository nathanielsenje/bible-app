import React, { useState } from 'react';
import { Container, Row, Button, Card, ButtonGroup } from 'react-bootstrap';
import '../App.css';

function ESV({ verseData }) {
  const [isSummarized, setIsSummarized] = useState(false);
  const [textClassName, setTextClassName] = useState('normal-text');

  // Handle potential loading or error states
  if (!verseData) {
    return <p className='mt-5'>Loading...</p>;
  }

  const formattedText = verseData.serverResponse[1]
    .slice(verseData.serverResponse[1].indexOf("[") - 1)
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

  const handleCopy = () => {
    // Get the text to copy based on the current display mode
    const textToCopy = isSummarized ? summarizedText : formattedText;

    // Create a temporary element to hold the text
    const tempElement = document.createElement('textarea');
    tempElement.value = textToCopy;

    // Append the element to the document (off-screen)
    document.body.appendChild(tempElement);

    // Select the text content
    tempElement.select();

    // Copy the selected text to the clipboard
    navigator.clipboard.writeText(tempElement.value)
      .then(() => {
        console.log('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
      });

    // Remove the temporary element
    document.body.removeChild(tempElement);
  };

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
            <ButtonGroup>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setIsSummarized(!isSummarized);
                  setTextClassName(isSummarized ? 'normal-text' : 'summarized-text');
                }}
              >
                {isSummarized ? 'Normal Text' : 'Memorize'}
              </Button>
              <Button variant="outline-dark" onClick={handleCopy}>Copy Text</Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default ESV;
