import React from "react";
import Task from "./Task";

function TaskList(props) {
  let { taskListHeader, data, ConvertTime, changeTaskDataCompleted } = props;

  data = data.sort((a, b) => {
    const timeA = ConvertTime(a?.time);
    const timeB = ConvertTime(b?.time);

    if (timeA > timeB) return -1;
    if (timeA < timeB) return 1;
    return 0;
  });

  const completedData = data.filter((task) => task.completed);
  const notCompletedData = data.filter((task) => !task.completed);

  return (
    <div className="taskList">
      <h2>{taskListHeader}</h2>
      {notCompletedData.map((task) => {
        return (
          <Task
            {...task}
            key={task.id}
            changeTaskDataCompleted={changeTaskDataCompleted}
          ></Task>
        );
      })}
      {completedData.map((task) => {
        return (
          <Task
            {...task}
            key={task.id}
            changeTaskDataCompleted={changeTaskDataCompleted}
          ></Task>
        );
      })}
    </div>
  );
}

export default TaskList;
