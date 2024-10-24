import "./App.css";
import MainLogo from "./components/globel-components/main-logo";
import Greeting from "./components/greetings/greeting";
import ImageUpload from "./components/image-upload/image-upload";
import HistoryCards from "./components/history-cards/history-cards";
import Footer from "./components/globel-components/footer";



function App() {

 
  return (
    <div className="App">

      <MainLogo />
      {/* <HomePage/> */}
      <section>
        <Greeting />
        <ImageUpload/>
        <HistoryCards />
        <Footer/>
      </section>
    </div>
  );
}

export default App;
