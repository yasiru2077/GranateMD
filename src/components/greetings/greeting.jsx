import React, { useEffect, useState } from "react";

function Greeting() {
  const [HourOfDay, setHourOfDay] = useState();

  // const now = new Date();
  // const currentHour = now.getHours();
  // console.log(currentHour.toString());
  const username = "Yasiru";

  function updateHour() {
    const currentHour = new Date().getHours();
    setHourOfDay(currentHour);
    console.log(HourOfDay);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateHour();
    }, 60000);
    return () => clearInterval(intervalId);
  },[]);

  return (
    <div className="Greeting">
      <h2 className="Time-of-the-day">
        <span>{username}</span>
      </h2>
    </div>
  );
}

export default Greeting;
