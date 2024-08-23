import _ from "lodash";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from 'react'
import RemoveSvg from "../globel-components/remove-svg";
import Button from "../globel-components/button";


function ImageUpload() {

  const [uploadedImage, setuploadedImage] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);

  let disease;

  switch (predictionResult) {
    case "Alternaria":
      disease = "Alternaria";
      break;
    case "Anthracnose":
      disease = "Anthracnose";
      break;
    case "Bacterial_Blight":
      disease = "Bacterial Blight";
      break;
    case "Cercospora":
      disease = "Cercospora";
      break;
    case "Healthy":
      disease = "Healthy";
      break;
    default:
      disease = "Unknown input";
      break;
  }

  console.log(uploadedImage);

  const onDrop = useCallback((acceptedFiles) => { 

  if (acceptedFiles?.length) {

  setuploadedImage(previousFiles => [
    ...previousFiles,
    ...acceptedFiles.map(file =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    )
  ]);

  
     
  }     
  },[])

  useEffect(() => {
    if(uploadedImage?.length > 1){
      const onlyLatestImage = uploadedImage.slice(uploadedImage?.length - 1); 
      setuploadedImage(onlyLatestImage);
      
    }
  },[uploadedImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    
    onDrop,
  });

  const removeFile = (name) => {
    setuploadedImage((prev) => prev.filter((file) => file.name !== name));
  }

  const handleSubmit = async () => {
    if (uploadedImage.length === 0) return;

    const formData = new FormData();
    formData.append('fileup', uploadedImage[0]);

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData,
        });

        const contentType = response.headers.get('content-type');
        console.log('Response Content-Type:', contentType);

        if (!contentType || !contentType.includes('application/json')) {
            console.log('Response Text:', await response.text());
            setPredictionResult('Unexpected response format, expected JSON.');
            return;
        }

        const data = await response.json();
        if (response.ok) {
            // setPredictionResult(`Prediction: ${data.prediction} with confidence ${data.confidence.toFixed(2)}`);
            setPredictionResult(`${data.prediction}`);
        } else {
            setPredictionResult(`Error: ${data.error}`);
        }
    } catch (error) {
        setPredictionResult(`Error: ${error.message}`);
    }
  }

  return (
    <React.Fragment>
    
    <section className="image-upload-section">
      <span>Add an image</span>
      <label {...getRootProps()} for="myFileInput">
      <input {...getInputProps()}/>
        <div>
          <svg class="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>

      </label>
      {/* <input  type="file" id="myFileInput" accept="image/*" /> */}
    </section>
    <section className={uploadedImage.length > 0 ? "view-image" : "view-imageOn"}>
    {uploadedImage.map(file=>(
      <React.Fragment>
      <RemoveSvg onRemove={()=>removeFile(file.name)}/>
    {/* <button type="submit">Submit</button> */}
      <img key={file.name} className="detecting-image" src={file.preview} alt={file.name} onLoad={() => {
        URL.revokeObjectURL(file.preview);
      } } /></React.Fragment>
    ))}
    
    <div className='detection-btn' onClick={handleSubmit}>
        <button type='submit'>Detect</button>
    </div>
    </section>
    {predictionResult && <div>{disease}</div>}
   
    </React.Fragment>
  )
}

export default ImageUpload;
