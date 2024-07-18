import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useMyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
function NavBar() {

    const { isLogin, setIsLogin } = useMyContext();
    const { isAdmin, setIsAdmin } = useMyContext();
    const {tusername, setTUsername} = useMyContext();

    const history = useNavigate();
    const handleLogout = async() => {
      // Clear local storage
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other necessary headers (e.g., authorization token)
        },
      });
      localStorage.clear();
      setIsLogin(0)
     setIsAdmin(0)
  
      // Navigate to home page
      history('/login'); // Replace with your actual home page route
    };
  

    return (
// 0EA2BD
      
             <Navbar collapseOnSelect 
           data-bs-theme="light"
             expand="lg"  fixed={"top"}  
             style={{backgroundColor:"#fff"}}
              className="mb-4">
      <Container fluid className='px-4 me-5'shadow  >
        <Navbar.Brand href="" sticky={"top"} style={{}} className='text-dark fw-bold'>Karma.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isLogin ? (
                <>
            <Nav.Link href="/addidea">Add Idea</Nav.Link>
            <Nav.Link href="/idealist">Idea List</Nav.Link>
            </>):(<></>)}
          </Nav>
          <Nav>

          {isLogin ? (
            <div className='me-xs-0 me-5'>
            <NavDropdown  title={tusername} id="collapsible-nav-dropdown">
            <NavDropdown.Item  onClick={handleLogout}>Logout</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item> */}
          </NavDropdown>
          </div>
):(

<>
    <Nav.Link href="/login">Login</Nav.Link>
    <Nav.Link eventKey={2} href="/register">
      Register
    </Nav.Link>
</>

)}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     

    )

}



export default NavBar;