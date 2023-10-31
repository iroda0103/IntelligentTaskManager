import React from "react";

function Statistika(props) {
  const { done, unfulfilled } = props;
  return (
    <div className="statistica">
      <p> Bajarilganlar:{done}</p>
      <p> Bajarilmaganlar:{unfulfilled}</p>
    </div>
  );
}

export default Statistika;
