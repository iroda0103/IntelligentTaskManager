import React, { useState } from "react";
import Time from "./Time";

function TaskAdder({ changeTaskData }) {
  let [taskName, setTaskName] = useState("");
  let [className, setClassName] = useState("");

  function cleningFromKeywords(name, key) {
    const cleaningWorld = name.match(key);
    if (cleaningWorld) {
      name = name.replace(cleaningWorld, "");
    }
    return { name, cleaningWorld };
  }

  function handleAddTask() {
    let bugun = taskName.match(/bugun/i);
    let ertaga = taskName.match(/ertaga/i);

    let taskTime = taskName.match(/\d\d:\d\d/);
    let taskDay = taskName.match(/\d\d.\d\d.\d\d\d\d/);

    if (!bugun && !ertaga && !taskDay) {
      bugun = "bugun";
    }

    if (taskDay && !taskTime) {
      taskTime = "09:00";
    }

    if (bugun) {
      let today = new Date();

      taskDay = `${today.getDate()}.${
        today.getMonth() + 1
      }.${today.getFullYear()}`;

      if (!taskTime) {
        const hours = today.getHours();
        const minutes = today.getMinutes();

        if (minutes == 0) {
          taskTime = `${hours}:00`;
        } else if (hours == 23 && minutes != 0) {
          const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

          taskTime = "00:00";
          taskDay = `${tomorrow.getDate()}.
            ${tomorrow.getMonth() + 1}.
            ${tomorrow.getFullYear()}`;
        } else {
          taskTime = `${hours + 1}:00`;
        }
      }
    }

    if (ertaga) {
      const today = new Date();
      let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      taskDay = `${tomorrow.getDate()}.${
        tomorrow.getMonth() + 1
      }.${tomorrow.getFullYear()}`;

      if (!taskTime) {
        taskTime = "09:00";
      }
    }

    const timeTask = taskDay + " " + taskTime;
    taskName = cleningFromKeywords(taskName, /bugun/).name;
    taskName = cleningFromKeywords(taskName, /ertaga/).name;
    taskName = cleningFromKeywords(taskName, /\d\d:\d\d/).name;
    taskName = cleningFromKeywords(taskName, /\d\d.\d\d.\d\d\d\d/).name;
    // console.log(taskName,'ppp');
    if (taskName.trim() == "") {
      setClassName("xato");
    } else {
      changeTaskData({
        taskName,
        time: timeTask,
        completed: false
      });

      setTaskName("");
      setClassName("")
    }
  }
  // ${taskDay?taskDay:new Date()} ${taskTime ? taskTime :"00:00"}
  function changeAddTaskName(e) {
    if (e.target.value == "") {
      setClassName("");
    }
    setTaskName(e.target.value);
  }

  return (
    <div>
      <div className="taskAdder">
        <div>
          <input
            value={taskName}
            className={
              className == "" ? "addTaskInput" : "addTaskInput errorInput"
            }
            placeholder={
              className != ""
                ? "Task matnini kiritish shart"
                : "Yangi vazifa qo'shish"
            }
            onChange={(e) => changeAddTaskName(e)}
            required
          />
          <div className="mobile">
            <Time />
          </div>
        </div>

        <button className="btnAddTask" onClick={handleAddTask}>
          +
        </button>
      </div>
      <div className="desktop">
        <Time />
      </div>
    </div>
  );
}

export default TaskAdder;
