import React from "react";
import "./globel-components.css"

function Tooltip() {
  return (
    <div className="tooltip-container absolute top-[50px] sm:right-1  bg-gray-900  text-white text-[14px] w-[200px] p-2 rounded-md">
     <div className="tip absolute -top-1 right-2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45">
     </div>
      <p>By saving this response will display in your prediction history and it will used to give you analytics. </p>
    </div>
  );
}

export default Tooltip;
