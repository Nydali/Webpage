import React, { useState } from "react";
import "./App.css";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    
    if (!day || !month || !year) {
      alert("Please fill in all fields.");
      return;
    }

    if (day < 1 || day > 31 || month < 1 || month > 12) {
      alert("Invalid day or month.");
      return;
    }

    if (inputDate > currentDate) {
      alert("The date cannot be in the future.");
      return;
    }

    if (isNaN(inputDate.getTime())) {
      alert("Invalid date.");
      return;
    }

   
    let years = currentDate.getFullYear() - inputDate.getFullYear();
    let months = currentDate.getMonth() - inputDate.getMonth();
    let days = currentDate.getDate() - inputDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(year, month, 0).getDate(); 
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    
    animateValue("years", 0, years, 1000);
    animateValue("months", 0, months, 1000);
    animateValue("days", 0, days, 1000);
  };

 
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const progress = currentTime - startTime;
      const currentValue = Math.min(
        Math.round((progress / duration) * (end - start) + start),
        end
      );
      obj.textContent = currentValue;
      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  return (
    <div className="container">
      <h1>Age Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="day">Day</label>
          <input
            type="number"
            id="day"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="month">Month</label>
          <input
            type="number"
            id="month"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit">Calculate Age</button>
      </form>

      <div className="result">
        <p>
          <span id="years">{age.years}</span> Years
        </p>
        <p>
          <span id="months">{age.months}</span> Months
        </p>
        <p>
          <span id="days">{age.days}</span> Days
        </p>
      </div>
    </div>
  );
}

export default App;

