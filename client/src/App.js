
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import Section1 from './components/section1';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import { useMyContext } from './context/MyContext';
import { useEffect } from 'react';
import IdeaForm from './pages/ideaform';
import FileUpload from './pages/fileupload';
import IdeaList from './pages/idealist';
import IdeaComment from './components/ideacomment';
import EditIdeaDescriptionForm from './pages/editidea';
import EditBlockOfTextForm from './pages/editblock';


function App() {
  const { isLogin, setIsLogin } = useMyContext();
  const { isAdmin, setIsAdmin } = useMyContext();
  const {tusername, setTUsername} = useMyContext();



  useEffect(() => {
    // alert('gfhfdh')setTUsername(localStorage.getItem('username'))
    setTUsername(localStorage.getItem('username'))


    if (localStorage.getItem('islogin') === null || localStorage.getItem('islogin') === undefined || localStorage.getItem('islogin') === "undefined") {
      setIsLogin(0);
  } else {
      setIsLogin(localStorage.getItem('islogin'));
  }
  if (localStorage.getItem('isadmin') === null || localStorage.getItem('isadmin') === undefined || localStorage.getItem('isadmin') === "undefined") {
    setIsAdmin(0);
} else {
    setIsAdmin(localStorage.getItem('isadmin'));
}
  }, [])


  return (
    <>
    
    <NavBar />
    {/* <Section1 /> */}



    
    <Routes >
          <Route exact  path="/"  element={<Section1/>} />
          {/* <Route exact  path="/about" element={<About/>} /> */}
          <Route exact  path="/addidea" element={<IdeaForm/>} />
          <Route exact  path="/register" element={<Register/>} />
          <Route exact  path="/login" element={<Login/>} />
          <Route exact  path="/upload" element={<FileUpload/>} />
          <Route exact  path="/idealist" element={<IdeaList/>} />
          <Route exact  path="/ideacomment" element={<IdeaComment/>} />
          <Route exact  path="/editidea" element={<EditIdeaDescriptionForm/>} />
           <Route exact  path="/editblock" element={<EditBlockOfTextForm/>} />
          
           {/*<Route exact  path="/addnewticket" element={<TicketForm/>} />
          <Route exact  path="/mytickets" element={<MyTickets/>} />

          <Route  path="/tickets" >
          <Route path=":ticketId"    element={<TicketComment />}/>          </Route> */}

        </Routes >

    </>
  );
}

export default App;
