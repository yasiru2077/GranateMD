import _ from "lodash";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";
import RemoveSvg from "../globel-components/remove-svg";
import Button from "../globel-components/button";
import { treatment } from "../../data-files/treatments-and-preventions";
import "./image-upload.css";
import { treatmentSinhala } from "../../data-files/treatments-sinhala";
import { Save } from "lucide-react";
import Tooltip from "../globel-components/tooltip";

function ImageUpload() {
  const [uploadedImage, setuploadedImage] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [changePrediction, setChangePrediction] = useState(false);
  const [index, setIndex] = useState(0);
  const [diseaseName, setDiseaseName] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      setSpeaking(false);
      return;
    }

    // If language is not English, alert the user
    if (!isEnglish) {
      const utterance = new SpeechSynthesisUtterance(
        "Sorry, I can't speak in Sinhala."
      );
      utterance.lang = "en-US"; // Use English language for the alert message
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      return;
    }

    // Generate the text to read aloud
    const text = `Symptoms: ${selectedDisease.symptoms.join(
      ", "
    )}. Treatment includes cultural practices like ${selectedDisease.treatment.cultural_practices
      .map((p) => `${p.practice}: ${p.description}`)
      .join(
        ", "
      )} and chemical control methods like ${selectedDisease.treatment.chemical_control
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

  if (isEnglish) {
    selectedDisease = treatment.plant_diseases.find(
      (d) => d.name.toLowerCase() === disease.toLowerCase()
    );
  } else {
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
              <div className="flex justify-between align-middle sm:flex-row flex-col">
                <h2 className="testtype text-[30px] font-bold">
                  {diseaseName}
                </h2>
                <div className="flex flex-row ">
                  <button
                    className="bg-black text-white mt-2 mb-2 p-1 rounded"
                    onClick={changeLanguage}
                  >
                    {isEnglish ? "සිංහල" : "English"}
                  </button>
                  <button
                    className="bg-green-950 flex gap-1 justify-center text-white m-2 p-2 rounded-full"
                    onClick={handleSpeech}
                  >
                    {speaking ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-md-heavy"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5V14.5C8.5 15.0523 8.94772 15.5 9.5 15.5H14.5C15.0523 15.5 15.5 15.0523 15.5 14.5V9.5C15.5 8.94772 15.0523 8.5 14.5 8.5H9.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-md-heavy"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                  </button>
                  <div
                    className="grid relative"
                    onMouseEnter={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}
                  >
                    <button>
                      <Save
                        size={40}
                        className="p-2 rounded-full border-2 hover:bg-black hover:text-white"
                      />
                    </button>
                    {isVisible && <Tooltip />}
                  </div>
                </div>
              </div>
              <h3>{isEnglish ? "Symptoms" : "ලක්ෂණ"}:</h3>
              <ul>
                {selectedDisease.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div className="Treatment">
              <h3>{isEnglish ? "Treatment" : "ප්‍රතිකාර"}:</h3>
              <h4>
                {isEnglish ? "Cultural Practices" : "සංස්කෘතික ක්‍රියාකාරකම්"}
              </h4>
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
              <h4>{isEnglish ? "Chemical Control" : "රසායනික පාලනය"}</h4>
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
