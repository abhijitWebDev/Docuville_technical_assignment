import  { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage(''); // Clear any previous error message when a new file is selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Please select a file before uploading.');
      return; // Stop the function execution if no file is selected
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setExtractedData(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('An error occurred while uploading the image.');
    }
  };

  return (
    <div>
      <h1>Driver&apos;s License Data Extraction</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload and Extract</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {extractedData && (
        <div>
          <h2>Extracted Data:</h2>
          <pre>{JSON.stringify(extractedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadForm;
