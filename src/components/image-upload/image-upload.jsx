import _ from "lodash";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";
import RemoveSvg from "../globel-components/remove-svg";
import Button from "../globel-components/button";
import { treatment } from "../../data-files/treatments-and-preventions";
import "./image-upload.css";
import { treatmentSinhala } from "../../data-files/treatments-sinhala";

function ImageUpload() {
  const [uploadedImage, setuploadedImage] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [changePrediction, setChangePrediction] = useState(false);
  const [index, setIndex] = useState(0);
  const [diseaseName, setDiseaseName] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  const handleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setSpeaking(false);
      return;
    }

    // If language is not English, alert the user
    if (!isEnglish) {
      const utterance = new SpeechSynthesisUtterance("Sorry, I can't speak in Sinhala.");
      utterance.lang = "en-US"; // Use English language for the alert message
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      return;
    }

    // Generate the text to read aloud
    const text = `Symptoms: ${selectedDisease.symptoms.join(", ")}. Treatment includes cultural practices like ${selectedDisease.treatment.cultural_practices
      .map((p) => `${p.practice}: ${p.description}`)
      .join(", ")} and chemical control methods like ${selectedDisease.treatment.chemical_control
      .map((c) => `${c.method}: ${c.description}`)
      .join(", ")}.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // English language
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const typingSpeed = 100;

  useEffect(() => {
    if (predictionResult && index < predictionResult.length) {
      const timer = setTimeout(() => {
        setDiseaseName((prev) => prev + predictionResult[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [index, changePrediction, typingSpeed]);

  useEffect(() => {
    setDiseaseName("");
    setIndex(0);
  }, [changePrediction]);

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

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setuploadedImage((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  useEffect(() => {
    if (uploadedImage?.length > 1) {
      const onlyLatestImage = uploadedImage.slice(uploadedImage?.length - 1);
      setuploadedImage(onlyLatestImage);
    }
  }, [uploadedImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },

    onDrop,
  });

  const removeFile = (name) => {
    setuploadedImage((prev) => prev.filter((file) => file.name !== name));
  };

  const handleSubmit = async () => {
    if (uploadedImage.length === 0) return;

    const formData = new FormData();
    formData.append("fileup", uploadedImage[0]);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.log("Response Text:", await response.text());
        setPredictionResult("Unexpected response format, expected JSON.");
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

    setChangePrediction(!changePrediction);
  };

 let selectedDisease;

  if(isEnglish){
    selectedDisease = treatment.plant_diseases.find(
      (d) => d.name.toLowerCase() === disease.toLowerCase()
    );
  }else{
    selectedDisease = treatmentSinhala.plant_diseases.find(
      (d) => d.name.toLowerCase() === disease.toLowerCase()
    );
  }
  

  useEffect(() => {
    const element = document.getElementById("content");
    element.scrollIntoView();
  }, [changePrediction]);

  function changeLanguage() {
    setIsEnglish(!isEnglish);
  }

  return (
    <React.Fragment>
      <section className="image-upload-section">
        <span>Add an image</span>
        <label {...getRootProps()} for="myFileInput">
          <input {...getInputProps()} />
          <div>
            <svg
              class="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Click to upload or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        </label>
        {/* <input  type="file" id="myFileInput" accept="image/*" /> */}
      </section>
      <section
        className={uploadedImage.length > 0 ? "view-image" : "view-imageOn"}
      >
        {uploadedImage.map((file) => (
          <React.Fragment>
            <RemoveSvg onRemove={() => removeFile(file.name)} />
            {/* <button type="submit">Submit</button> */}
            <img
              key={file.name}
              className="detecting-image"
              src={file.preview}
              alt={file.name}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </React.Fragment>
        ))}

        <div className="detection-btn" onClick={handleSubmit}>
          <button type="submit">Detect</button>
        </div>
      </section>
      <section
        id="content"
        className={
          selectedDisease ? "treatment-container-on" : "treatment-container-off"
        }
      >
        {selectedDisease && (
          <div>
            <div className="name-and-Symptoms">
              <div className="flex justify-between align-middle">
                <h2 className="testtype text-[30px] font-bold">{diseaseName}</h2>
               <div className="">
               <button
                  className="bg-black text-white m-2 p-1 rounded"
                  onClick={changeLanguage}
                >
                  {isEnglish ? "සිංහල" : "English"}
                </button>
                <button
                className="bg-green-500 text-white m-2 p-1 rounded"
                onClick={handleSpeech}
              >
                {speaking ? "Stop Speech" : "Play Speech"}
              </button>
               </div>
              
              
              </div>
              <h3>Symptoms:</h3>
              <ul>
                {selectedDisease.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div className="Treatment">
              <h3>{isEnglish ? "Treatment":"ප්‍රතිකාර"}:</h3>
              <h4>{isEnglish ? "Cultural Practices":"සංස්කෘතික ක්‍රියාකාරකම්"}</h4>
              <ul>
                {selectedDisease.treatment.cultural_practices.map(
                  (practice, index) => (
                    <li key={index}>
                      <strong>{practice.practice}:</strong>{" "}
                      {practice.description}
                    </li>
                  )
                )}
              </ul>
              <h4>{isEnglish ? "Chemical Control":"රසායනික පාලනය"}</h4>
              <ul>
                {selectedDisease.treatment.chemical_control.map(
                  (control, index) => (
                    <li key={index}>
                      <strong>{control.method}:</strong> {control.description}
                    </li>
                  )
                )}
              </ul>
            </div>
            {/* <h4>Resistant Varieties:</h4>
            <p>{selectedDisease.treatment.resistant_varieties}</p> */}
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default ImageUpload;
