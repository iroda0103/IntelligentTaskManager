import React from "react";
import { Label } from "../utilits/style-components/Label";
import { Span } from "../utilits/style-components/Span";

function Task(props) {
  const { taskName, completed, time, id, changeTaskDataCompleted } = props;

  function handleCopleted() {
    changeTaskDataCompleted(id);
  }

  return (
    <div className="task">
      <div className="checkbox" onClick={handleCopleted}>
        <input
          checked={completed}
          type="checkbox"
          onChange={handleCopleted}
          className="input-assumpte"
          id="input-confidencial"
        />
        <Label $completed={completed}>{taskName}</Label>
      </div>

      <Span $completed={completed}>{time}</Span>
    </div>
  );
}

export default Task;
