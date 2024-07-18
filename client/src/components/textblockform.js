import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMyContext } from '../context/MyContext';


const TextBlockForm = ({ticketId,senderid_}) => {
  const [content, setContent] = useState('');
  const {addcomment, setAddcomment}= useMyContext();
  const { refreshestimate,setrefreshestimate}= useMyContext();
  const senderid=localStorage.getItem('userid')
  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`http://localhost:3000/api/addtexttoticket/${ticketId}`)
    // Send the form data to the server using your preferred method (e.g., fetch)
    // Replace the URL with your actual API endpoint
    fetch(`http://localhost:3000/api/addtexttoticket/${ticketId}`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        //  'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        senderid,
        ticketId,
        content,
        // Add ticket_id and author_id based on your application's logic
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle server response if needed
        // alert(data)
        console.log('Server response:', data);
        setContent('')
        setAddcomment(!addcomment)
        setrefreshestimate(!refreshestimate)
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };



  
  return (
   
        
       
    <Form onSubmit={handleSubmit} >
      <Form.Group controlId="content">
        <Form.Label>Add Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button variant="success mt-2" type="submit">
        Submit
      </Button>

    </Form>

   

  );
};

export default TextBlockForm;