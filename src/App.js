import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, InputGroup, Button, Select } from 'react-bootstrap';

import ESV from './components/ESV';

function App() {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [verseData, setVerseData] = useState(null);
  const [error, setError] = useState(null);

  const books = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/${book}/${chapter}/${verse}`
      );
      setVerseData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    return () => {
      const unsubscribe = fetchData(); // Cleanup function
      return unsubscribe;
    };
  }, []); // Empty dependency array to fetch only once on component mount

  const handleSubmit = (e) => {
    e.preventDefault();

    setVerseData(null);
    setError(null);

    // Trigger fetchData only when the form is submitted
    fetchData();
  };

  return (
    <div className="App">
      <Container>
        <ESV verseData={verseData} className="mt-5 mb-5" />

        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Select
              value={book}
              onChange={(e) => setBook(e.target.value)}
            >
              {books.map((book) => (
                <option key={book} value={book}>
                  {book}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              type="number"
              value={chapter}
              placeholder='Chapter'
              onChange={(e) => setChapter(e.target.value)}
            />
            <Form.Control
              type="text"
              value={verse}
              placeholder='Verse'
              onChange={(e) => setVerse(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Fetch
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </div>
  );
}

export default App;
