import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userImage, setUserImage] = useState(null); // State for user image
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('is_admin', isAdmin);
    formData.append('image', userImage); // Append user image to form data

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setShowSuccessAlert(true);

        setUsername('');
        setEmail('');
        setPassword('');
        setIsAdmin(false);
        setUserImage(null); // Clear the user image state
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  return (
    <section style={{marginTop:'70px'}}>
      <Container className="">
    <Row className='bg-light rounded border m-5 p-3 shadow-sm'>
      <div>
        {showSuccessAlert && (
          <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
            User registered successfully!
          </Alert>
        )}
        {showErrorAlert && (
          <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
            Error registering user. Please try again.
          </Alert>
        )}
        <Row className='text-center'>
          <Col>
            <h4 className='text-dark'>Register New User</h4>
          </Col>
          <hr />
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formIsAdmin">
            <Form.Label>Is Admin</Form.Label>
            <Form.Check
              type="checkbox"
              label="Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formUserImage">
            <Form.Label>User Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
          <Button variant="info" className='m-1' type="submit">Submit</Button>
        </Form>
      </div>
    </Row>
    </Container>
    </section>
  );
};

export default Register;