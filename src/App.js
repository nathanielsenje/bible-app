import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import { Container, Row, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

const booksOfTheBible = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];

function App() {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [error, setError] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [buttonText, setButtonText] = useState('Memorize');

  const fetchVerse = useCallback(async () => {
    try {
      const response = await axios.get(`https://bible-api.com/${book}+${chapter}:${verse}`);
      setText(response.data.text);
      setDisplayText(response.data.text);
      setShowCard(true);
    } catch (error) {
      setError('Error fetching verse');
      console.error('Error fetching verse:', error);
    }
  }, [book, chapter, verse]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    fetchVerse();
  }, [fetchVerse]);

  const handleMemorize = useCallback(() => {
    if (buttonText === 'Memorize') {
      const words = text.split(/[\s.]+/); // Split by both spaces and periods
      const firstLetters = words.map(word => {
        // Skip special characters at the start of the word
        let startIndex = 0;
        while (startIndex < word.length && /[^A-Za-z0-9]/.test(word[startIndex])) {
          startIndex++;
        }
        return startIndex < word.length ? word[startIndex].toUpperCase() : '';
      }).join(' ');
      setDisplayText(firstLetters);
      setButtonText('See full text');
    } else {
      setDisplayText(text);
      setButtonText('Memorize');
    }
  }, [text, buttonText]);


  return (
    <div className="App">
      <Container>
        <Row className='mt-5 mb-3'>
          {error && <p>{error}</p>}

          {showCard && (
            <Card>
              <Card.Body>
                <Card.Text>
                  <Card.Title><h3>{book} {chapter}:{verse}</h3></Card.Title>
                  <hr />
                  <p className={buttonText === 'Memorize' ? 'large-text' : 'small-text'}>{displayText}</p> {/* Modify this line */}
                </Card.Text>
                <Button variant="outline-dark" onClick={handleMemorize}>{buttonText}</Button>
              </Card.Body>
            </Card>
          )}
        </Row>

        <Row>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control as="select" value={book} onChange={e => setBook(e.target.value)} required>
                <option value="">Book</option>
                {booksOfTheBible.map((book) => (
                  <option key={book} value={book}>{book}</option>
                ))}
              </Form.Control>
              <Form.Control type="number" value={chapter} onChange={e => setChapter(e.target.value)} placeholder="Chapter" required />
              <Form.Control type="text" value={verse} onChange={e => setVerse(e.target.value)} placeholder="Verse" required />
              <Button variant="dark" type="submit">Fetch</Button>
            </InputGroup>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default App;
