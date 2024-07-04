import React, { useEffect, useState } from "react";


function Greeting() {
  const [HourOfDay, setHourOfDay] = useState(new Date().getHours());

  // const now = new Date();
  // const currentHour = now.getHours();
  // console.log(currentHour.toString());
  const username = "Yasiru";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHourOfDay(new Date().getHours());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const determineGreeting = () => {
    if (HourOfDay >= 5 && HourOfDay < 12) {
      return "Good morning";
    } else if (HourOfDay >= 12 && HourOfDay < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <div className="Greeting">
      <h2 className="Time-of-the-day">
      {determineGreeting()}, <span>{username}</span>
        
      </h2>
    </div>
  );
}

export default Greeting;
