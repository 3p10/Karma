import { Badge } from "react-bootstrap";
import { useMyContext } from "../context/MyContext";
import { useEffect, useState } from "react";
import axios from 'axios';

function Karma({idea}){
    const { karmaUpdate, setkarmaUpdate } = useMyContext()
    const [userKarma, setUserKarma] = useState(idea.karma);
    const [error, setError] = useState(null);
useEffect(()=>{

    const fetchUserKarma = async () => {
        try {
            // alert(`http://localhost:3000/api/get-user-karma/${idea.sender}`)
          const response = await axios.get(`http://localhost:3000/api/get-user-karma/${idea.sender}`);
          setUserKarma(response.data.karma);
          setError(null); // Reset error state
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('User not found');
          } else {
            setError('Error fetching user karma');
          }
          setUserKarma(null); // Reset user karma
        }
      };
  
      fetchUserKarma();
},[karmaUpdate])




    return(
        <Badge style={{ minWidth: "150px" }} 
        className='my-3 p-2' 
        bg="dark">{idea.sender}:
        <Badge className='ms-2' pill bg="success">
            {userKarma.toFixed(2)}</Badge></Badge>
   
   
        )
}


export default Karma;