import { useState } from 'react';
import { Form, Button, Alert ,Row,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';
function Login() {
const { isLogin, setIsLogin } = useMyContext();
const { isAdmin, setIsAdmin } = useMyContext();
const {tusername, setTUsername} = useMyContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
const [showstatus,setshowstatus]=useState(false)
  const handleLogin = async () => {
    setshowstatus(true)
    // try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        // credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        // if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('islogin', 1);
          // console.log("success"+username+"-"+password)
          localStorage.setItem('isadmin', data.is_admin);
          localStorage.setItem('userkarma', data.karma);
          localStorage.setItem('userid', data.userid);
          localStorage.setItem('username', username);
          setTUsername(username)



       







         
        // alert(data.is_admin)
         setIsAdmin(data.is_admin)
        //   setIsLogin(1)
          // Handle successful login, e.g. redirect to home page
           history('/'); 
        // } else {
          setIsLogin(0)
          localStorage.setItem('islogin', 0);
        //   setError('Invalid username or password. Please try again.');
        // }
      } else {
     setIsLogin(0)
     localStorage.setItem('islogin', 0);
        setError('Invalid username or password. Please try again.');
      }
    // } catch (error) {
    //   setError('An error occurred. Please try again.');
    // }
  };

  return (
    <div  className="d-flex justify-content-center align-items-center m-4 " >
    <Row className='bg-light text-dark w-50 rounded border p-3 shadow-sm ' style={{marginTop:'50px'}}>
      <Col>
        <Row className="text-center">
          <Col>
            <h3 style={{color:'#198754'}}>Login</h3>
          </Col>
        </Row>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>
          <div className="d-grid gap-2">
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="success" type="button"   className='btn-block ' onClick={handleLogin}>
            Login
          </Button>
         </div>
        </Form>
      </Col>
    </Row>
  </div>

  );
}

export default Login;