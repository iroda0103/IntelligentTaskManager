import React, { useState } from "react";
import Time from "./Time";

function TaskAdder({ changeTaskData }) {
  let [taskName, setTaskName] = useState("");
  let [className, setClassName] = useState("");
  const defaultTime = "09:00";
  const oneDateMilliSecunds = 24 * 60 * 60 * 1000;

  function cleningFromKeywords(name, key) {
    const cleaningWorld = name.match(key);
    if (cleaningWorld) {
      name = name.replace(cleaningWorld, "");
    }
    return name;
  }

  function tommorowDate(today) {
    const tomorrow = new Date(today.getTime() + oneDateMilliSecunds);

    return `${tomorrow.getDate()}.${
      tomorrow.getMonth() + 1
    }.${tomorrow.getFullYear()}`;
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
      taskTime = defaultTime;
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
        }

        //Bugun kun vaqt 23:00dan o'tgan bo'lsa vaqti ertangi kunni ko'rsatadi
        else if (hours == 23 && minutes != 0) {
          taskTime = "00:00";
          taskDay = tommorowDate(today);
        } else {
          taskTime = `${hours + 1}:00`;
        }
      }
    }

    if (ertaga) {
      const today = new Date();
      taskDay = tommorowDate(today);

      if (!taskTime) {
        taskTime = defaultTime;
      }
    }

    const timeTask = taskDay + " " + taskTime;
    taskName = cleningFromKeywords(taskName, /bugun/);
    taskName = cleningFromKeywords(taskName, /ertaga/);
    taskName = cleningFromKeywords(taskName, /\d\d:\d\d/);
    taskName = cleningFromKeywords(taskName, /\d\d.\d\d.\d\d\d\d/);

    if (taskName.trim() == "") {
      setClassName("xato");
    } else {
      changeTaskData({
        taskName,
        time: timeTask,
        completed: false
      });

      setTaskName("");
      setClassName("");
    }
  }

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
