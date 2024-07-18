import { Badge } from "react-bootstrap";
import { useMyContext } from "../context/MyContext";
import { useEffect, useState } from "react";
import axios from 'axios';

function IdeaKarma({idea}){
    const { karmaUpdate, setkarmaUpdate } = useMyContext()
    const [ideakarma, setideakarma] = useState();
    const [error, setError] = useState(null);

    useEffect(()=>{

      const fetchideakarma = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/get-idea-karma/${idea.id}`);
            setideakarma(response.data.fkarma);
            setError(null); // Reset error state
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setError('User not found');
            } else {
              setError('Error fetching user karma');
            }
            setideakarma(null); // Reset user karma
          }
        };
    
        fetchideakarma();
  },[])

useEffect(()=>{

    const fetchideakarma = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/get-idea-karma/${idea.id}`);
          setideakarma(response.data.fkarma);
          setError(null); // Reset error state
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('User not found');
          } else {
            setError('Error fetching user karma');
          }
          setideakarma(null); // Reset user karma
        }
      };
  
      fetchideakarma();
},[karmaUpdate])




    return(
       
      <h6>
        <Badge className='ms-2' pill bg="danger">
            {ideakarma}</Badge>
            
      </h6>

   
   
        )
}


export default IdeaKarma;