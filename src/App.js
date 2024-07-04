import { useState } from "react";
import "./App.css";
import MainLogo from "./components/globel-components/main-logo";
import Greeting from "./components/greetings/greeting";
import ImageUpload from "./components/image-upload/image-upload";
import HistoryCards from "./components/history-cards/history-cards";

// https://github.com/yasiruAtHippohotels
function App() {
  const [uploadedImages, setUploadedImages] = useState();

  return (
    <div className="App">

      <MainLogo />
      {/* <HomePage/> */}
      <section>
        <Greeting />
        <ImageUpload uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
        <HistoryCards />
      </section>
    </div>
  );
}

export default App;
