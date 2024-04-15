import "./App.css";
import MainLogo from "./components/globel-components/main-logo";
import Greeting from "./components/greetings/greeting";
import HomePage from "./pages/home-page/home-page";


function App() {
  return (
    <div className="App">
      
      <MainLogo/>
      <HomePage/>
      <Greeting/>
    </div>
  );
}

export default App;
