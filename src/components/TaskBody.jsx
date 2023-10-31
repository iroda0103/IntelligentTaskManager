import React from "react";
import TaskList from "./TaskList";

function TaskBody({ data, changeTaskDataCompleted }) {
  function ConvertTime(taskTime) {
    if (!taskTime) {
      return taskTime;
    }
    const [date, time] = taskTime.split(" ");
    if (!time || !date) {
      return taskTime;
    }
    const [day, month, year] = date.split(".");
    const [hours, minutes] = time.split(":");

    return new Date(year, month - 1, day, hours, minutes);
  }

  function equalTime(taskTime, comparableTime) {
    const convertedDate = ConvertTime(taskTime);

    return (
      comparableTime.getFullYear() == convertedDate.getFullYear() &&
      comparableTime.getMonth() == convertedDate.getMonth() &&
      comparableTime.getDate() == convertedDate.getDate()
    );
  }

  const taskGroup = {
    Bugun: [],
    Ertaga: [],
    Keyin: []
  };

  const oneDateMilliSecunds = 24 * 60 * 60 * 1000;
  const today = new Date();
  const tomorrow = new Date(today.getTime() + oneDateMilliSecunds);

  taskGroup.Bugun = data.filter((task) => equalTime(task.time, today));
  taskGroup.Bugun = taskGroup.Bugun.map((task) => {
    return { ...task, time: task.time.split(" ")[1] };
  });

  taskGroup.Ertaga = data.filter((task) => {
    return equalTime(task.time, tomorrow);
  });
  taskGroup.Ertaga = taskGroup.Ertaga.map((task) => {
    return { ...task, time: task.time.split(" ")[1] };
  });
  taskGroup.Keyin = data.filter(
    (task) =>{
      const farq=ConvertTime(task.time);
      const farq1=taskGroup.Ertaga.find(task2=>task2.id==task.id);
      return ((tomorrow<farq) && !farq1 )
    }
  );
console.log(taskGroup);
  return (
    <div>
      {Object.entries(taskGroup).map(([key, value]) =>
        value.length == 0 ? (
          ""
        ) : (
          <TaskList
            key={key}
            taskListHeader={key}
            data={value}
            ConvertTime={ConvertTime}
            changeTaskDataCompleted={changeTaskDataCompleted}
          />
        )
      )}
    </div>
  );
}

export default TaskBody;
