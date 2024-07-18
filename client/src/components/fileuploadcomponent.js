import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const FileUploadComponent = ({title}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // This will hold the name of the file selected for upload
  const [uploadedFiles, setUploadedFiles] = useState([]); // An array to store uploaded file details
//   const [parentTiltle, setparentTiltle] = useState('')


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {

    if (file){


  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_name', file.name);
    formData.append('ideaTitle', title);
    // Send POST request to the file upload route
    try {


        const response = await fetch('http://127.0.0.1:3000/api/upload', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            body: formData,
                      
          });
    
          if (response.ok) {
            console.log('File uploaded successfully');
            document.getElementById('fileInput').value = ''; // Reset the value of the file input
            setFile(null); // Clear the selected file from state
            setFileName(''); // Clear the file name from state
            setUploadedFiles([...uploadedFiles, {  name: file.name }]);
          } else {
            console.error('Failed to upload file');
          }

      // Upon successful upload, update the state with the uploaded file details
     
    } catch (error) {
      console.error('Error uploading file:', error);
    }


}else{
    alert('seletc file')
}
  };

  const handleDelete = (name) => {
    // Filter out the deleted file based on its id
    const updatedFiles = uploadedFiles.filter(file => file.name !== name);
    setUploadedFiles(updatedFiles);
  };

  return (
    <div>
      <input  id="fileInput" type="file" onChange={handleFileChange} />
      <Button variant="info" onClick={handleUpload}>Upload</Button>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            {file.name} 
            {/* <button onClick={() => handleDelete(file.name)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadComponent;