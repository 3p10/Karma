import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { BiLike, BiDislike } from 'react-icons/bi';
import { FaRegEdit } from "react-icons/fa";
import { useMyContext } from '../context/MyContext';
import axios from 'axios';
import { RiDeleteBin5Line, RiDeleteBin6Line } from "react-icons/ri";
const LikeDislikeToggle = ({ idea }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [action, setAction] = useState('');
  const { karmaUpdate, setkarmaUpdate } = useMyContext();
  const {homeUpdate,sethomeUpdate}=useMyContext()
  const {currentidea, setcurrentidea}=useMyContext()

// console.log(idea)
  const handleIconClick = async (icon) => {
    setSelectedIcon(icon);
    if (icon === 'like') {
      //   alert('You liked this!'+idea.id);
      setAction('like')

      try {
        const response = await axios.post(`http://localhost:3000/api/update-karma/${idea.sender}/${idea.id}`, { action: 'like' });
        console.log(response.data); // Log the response data
        // Handle success, update UI, etc.

      } catch (error) {
        console.error('Error updating karma:', error);
        // Handle error, show user a message, etc.
      }

      setkarmaUpdate(!karmaUpdate)

    } else if (icon === 'dislike') {
      //   alert('You disliked this!'+idea.id);
      setAction('dislike')
      try {
        const response = await axios.post(`http://localhost:3000/api/update-karma/${idea.sender}/${idea.id}`, { action: 'dislike' });
        console.log(response.data); // Log the response data
        // Handle success, update UI, etc.
        setkarmaUpdate(!karmaUpdate)
      } catch (error) {
        console.error('Error updating karma:', error);
        // Handle error, show user a message, etc.
      }
      //   setkarmaUpdate(!karmaUpdate)
    }
  };

  const deleteidea = (id) => {
    // alert(`http://localhost:3000/api/ideas/${id}`)
    fetch(`http://localhost:3000/api/ideas/${id}/${localStorage.getItem('userid')}`, {
      method: 'DELETE',
      // credentials: 'include' // This includes credentials in the request
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`
        // Include any necessary headers, such as authorization token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }else{

          sethomeUpdate(!homeUpdate)
        }
        // Idea deleted successfully
        // alert('Idea deleted successfully');
        // Perform any necessary UI updates
      })
      .catch(error => {

        // Unauthorized to delete
        // alert('Unauthorized to delete the idea');

      });
  };

  const handleLinkClick = (id) => {
    // Set the selected icon in the context state
   
    setcurrentidea(id); // For example, setting the selected icon to 'edit'
    localStorage.setItem('cidea',id) 

    // Navigate to the href
    window.location.href = '/editidea';
  };
  return (
    <Col className="d-flex justify-content-end">
      <BiLike
        style={{ cursor: 'pointer' }}
        className={`me-3 ${selectedIcon === 'like' ? 'text-danger' : ''}`}
        size={25}
        onClick={() => handleIconClick('like')}
      />
      <BiDislike
        style={{ cursor: 'pointer' }}
        className={`me-3 ${selectedIcon === 'dislike' ? 'text-danger' : ''}`}
        size={25}
        onClick={() => handleIconClick('dislike')}
      />
{
(idea.sender==localStorage.getItem('username') ||  localStorage.getItem('isadmin')==1 ||  localStorage.getItem('isadmin')=='true')?
<>
<RiDeleteBin5Line
        style={{ cursor: 'pointer' }}
        className={`me-3 ${selectedIcon === 'dislike' ? 'text-danger' : ''}`}
        size={25}
        color='red'
        onClick={() => deleteidea(idea.id)}
      />
   <a onClick={()=>handleLinkClick(idea.id)}>
      <FaRegEdit
      style={{ cursor: 'pointer' }}
        className={`me-3 ${selectedIcon === 'dislike' ? 'text-danger' : ''}`}
        size={25}
        color='blue'

      
       
        />
        </a>
         </>
      
      :(<></>)
}
    

    </Col>
  );
};

export default LikeDislikeToggle;
