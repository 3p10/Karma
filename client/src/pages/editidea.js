import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useMyContext } from '../context/MyContext';

const EditIdeaDescriptionForm = () => {

useEffect(()=>{

    // alert(localStorage.getItem('cidea'))
},[])
  const {currentidea, setcurrentidea}=useMyContext()
  const [newDescription, setNewDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/ideas/${localStorage.getItem('cidea')}/description`, { description: newDescription })
      .then(response => {
        console.log(response.data.message);
        window.location.href = '/idealist';
        // Handle success, e.g., display a success message to the user
      })
      .catch(error => {
        console.error('Error updating idea description:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  return (
    <Container className='mt-4 m-5 p-5'>

<Row>
<Col>


    <Form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="descriptionInput">New Description:</label>
        <textarea className='form-control' id="descriptionInput" value={newDescription} onChange={handleDescriptionChange} />
      </div>
      <Button className='mt-2' variant='info' type="submit">Save Description</Button>
    </Form>

    
</Col>

</Row>

    </Container>
  );
};

export default EditIdeaDescriptionForm;