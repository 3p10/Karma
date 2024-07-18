// FileUpload.js

import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
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
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;