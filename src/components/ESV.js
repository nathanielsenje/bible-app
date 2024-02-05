import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

const ESV = ({ verse }) => {
  const [verseData, setVerseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/');
        setVerseData(response); // Access the correct object property
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : verseData ? (
        <>
          <h1>{verseData.data.serverResponse[0]}</h1>
          <p> {verseData.data.serverResponse[1]} </p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      
    </div>
  );
};

export default ESV;
