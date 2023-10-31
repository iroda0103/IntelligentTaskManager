import React, { useState } from "react";
import { Label } from "../utilits/style-components/Label";
import { Span } from "../utilits/style-components/Span";

function Task(props) {
  const { taskName, completed, time,id,changeTaskDataCompleted } = props;
  const [inputCompleted, setinputCompleted] = useState(completed);

  function handleCopleted() {
    console.log(id);
    // setinputCompleted(!inputCompleted)
    changeTaskDataCompleted(id);
  }

  return (
    <div className="task">
      <div className="checkbox" onClick={handleCopleted}>
        <input
          checked={inputCompleted}
          type="checkbox"
          onChange={handleCopleted}
          className="input-assumpte"
          id="input-confidencial"
        />
        <Label $completed={inputCompleted}>{taskName}</Label>
      </div>

      <Span $completed={inputCompleted}>{time}</Span>
    </div>
  );
}

export default Task;
