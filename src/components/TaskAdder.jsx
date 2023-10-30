import React from "react";
import Time from "./Time";

function TaskAdder() {
  return (
    <div>
      <div className="taskAdder">
        <input className="addTaskInput" placeholder="Yangi vazifa qo'shish" />
        <button className="btnAddTask">+</button>
      </div>
      <Time />
    </div>
  );
}

export default TaskAdder;
