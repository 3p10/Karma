import React, { useState, useEffect } from 'react';
import { useMyContext } from '../context/MyContext';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

function Blocklist({ ideaId,idea}) {
  const [blockOfTexts, setBlockOfTexts] = useState([]);
  const { refreshestimate,setrefreshestimate}= useMyContext();
  useEffect(() => {
    const fetchBlockOfTexts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/ideas/${ideaId}/block-of-text`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlockOfTexts(data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error state
      }
    };

    fetchBlockOfTexts();
  }, [refreshestimate]);
  useEffect(() => {
    const fetchBlockOfTexts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/ideas/${ideaId}/block-of-text`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlockOfTexts(data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error state
      }
    };

    fetchBlockOfTexts();
  }, [ideaId]);








    const deleteTextBlock = async ({ blockId }) => {
      // alert(blockId)
      try {
        const response = await fetch(`http://localhost:3000/api/deletetextblock/${blockId}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete text block');
        }
  
        // Text block deleted successfully
        console.log('Text block deleted successfully');
        setrefreshestimate(!refreshestimate)
        // You can update the UI or state to reflect the deletion
      } catch (error) {
        console.error('Error deleting text block:', error.message);
        // Handle and display the error to the user
      }
    }

  


    const handleLinkClick = (id) => {
      // Set the selected icon in the context state
     
   
      localStorage.setItem('bid',id) 
  
      // Navigate to the href
      window.location.href = '/editblock';
    };


  return (
    <div>
   
      <ul>
        {blockOfTexts.map((blockOfText) => (
          <li key={blockOfText.id}>
            <p><b>{blockOfText.sender_username}:</b> 
            <br/>
            {blockOfText.content}</p>
     {       (idea.sender==localStorage.getItem('username') ||  localStorage.getItem('isadmin')==1 ||  localStorage.getItem('isadmin')=='true')?
          
          
          <>
          
          <RiDeleteBin5Line
        style={{ cursor: 'pointer' }}
        className={`me-3 `}
        size={25}
        color='red'
        onClick={async() =>{

          try {
            const response = await fetch(`http://localhost:3000/api/deletetextblock/${blockOfText.id}`, {
              method: 'DELETE'
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to delete text block');
            }
      
            // Text block deleted successfully
            console.log('Text block deleted successfully');
            setrefreshestimate(!refreshestimate)
            // You can update the UI or state to reflect the deletion
          } catch (error) {
            console.error('Error deleting text block:', error.message);
            // Handle and display the error to the user
          }

        }}
      />
      <a onClick={()=>handleLinkClick(blockOfText.id)}>
      <FaRegEdit
      style={{ cursor: 'pointer' }}
        className={`me-3 `}
        size={25}
        color='blue'

      
       
        />
        </a>
      </>
      
      :(<></>)
}
        
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Blocklist;