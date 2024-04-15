import React from "react";
import "../../App.css"

function MainLogo() {
  return (
    <div className="main-logo">
       <img
        className="app-logo-image"
        src="./images/mainlogo.png"
        alt="main logo"
      />
      <h1 className="app-logo-font">GranateMD</h1>
    </div>
  );
}

export default MainLogo;
