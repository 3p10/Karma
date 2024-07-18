// IdeaForm.js
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import FileUploadComponent from '../components/fileuploadcomponent';
const IdeaForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [file, setfile] = useState(null);


  const [showdetail, setshowdetail] = useState(false)


useEffect(()=>{

// alert(localStorage.getItem('userkarma'))

},[])


  const addFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        // credentials: 'include',
        body: formData
      });

      if (response.ok) {

        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error occurred while uploading file', error);
    }
    // Handle form submission (e.g., send data to the server)
    console.log('Submitted:', title, description, image);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    fetch('http://localhost:3000/api/ideas1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((response) => {
        response.json()

        setshowdetail(true)
      })
      .then((data) => {

        console.log(data)
        // alert(data)

      })
      .catch((error) => {
        setshowdetail(false)
        console.error('Error:', error)
      });

  };

  return (
    <>
    {(localStorage.getItem('userkarma')>=1)?
    <>
      <section className="m-5">
        <Container className='m-4 shadow-sm p-4 bg-light'>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Button className='mt-4' variant="info" type="submit" disabled={showdetail}>
              Submit
            </Button>
          </Form>
        </Container>
      </section>

      {showdetail ? (

        <section  >

          <Container className=' p-2 m-1'>

            <Row>

              <Col>
                {/* <Form.Group controlId="image">
        <Form.Label>Add Image To Idea</Form.Label>
        <Form.Control
          type="file"
          accept=""
          onChange={(e) => setfile(e.target.files[0])}
        />


      </Form.Group> */}



                <FileUploadComponent title={title} />
              </Col>

            </Row>


          </Container>

        </section>

      ) : (<></>)}


</>
:(<Container><Row><Col><h3>You can not post idea , your karma must greater or equal than  1.</h3></Col></Row></Container>)
    }   
</>
  );
};

export default IdeaForm;
