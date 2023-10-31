import React, { useState, useEffect } from "react";

export const Time = () => {
  const [date, setDate] = useState(new Date());

  function addZero(time) {
    return time.toString().length == 1 ? "0" + time : time;
  }

  const time = `${addZero(date.getDate())}.
  ${addZero(date.getMonth() + 1)}.
  ${date.getFullYear()}, 
  ${addZero(date.getHours())}:
  ${addZero(date.getMinutes())}`;

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return <div>Bugun:{time}</div>;
};

export default Time;
