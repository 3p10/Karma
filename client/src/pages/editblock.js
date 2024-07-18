import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';

const EditBlockOfTextForm = () => {
  const [content, setContent] = useState('');
  const [blockId, setBlockId] = useState(''); // State to hold the ID of the BlockOfText to edit

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/editblockoftext/${localStorage.getItem('bid')}`, { content });
      console.log(response.data.message); // Log the response from the server
      window.location.href = '/idealist';
    } catch (error) {
      console.error('Error editing BlockOfText:', error);
    }
  };

  return (
    <Container className='p-5 m-4'>
    <Row>
        <Col>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="New Content"
        className='form-control'
      />
      <Button className='my-2' variant='info' onClick={handleEdit}>Edit BlockOfText</Button>
      </Col>
      </Row>
    </Container>
  );
};

export default EditBlockOfTextForm;