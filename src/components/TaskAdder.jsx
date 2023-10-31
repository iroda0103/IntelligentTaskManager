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

  function isValidDate(day) {
    const dateSplit = day.split(".");
    const date = +dateSplit[0];
    const month = +dateSplit[1];
    const years = +dateSplit[2];

    return date <= 31 && month <= 12 && years >= 2023;
  }

  function isValidTime(time) {
    console.log(time);
    const dateSplit = time.split(":");
    const hours = +dateSplit[0];
    const minutes = +dateSplit[1];
    console.log(hours, minutes);
    return hours <= 23 && minutes <= 60;
  }

  function handleAddTask() {
    let bugun = taskName.match(/bugun/i);
    let ertaga = taskName.match(/ertaga/i);

    let taskTime = taskName.match(/\d\d:\d\d/);
    let taskDay = taskName.match(/\d\d.\d\d.\d\d\d\d/);

    if (!bugun && !ertaga && !taskDay) {
      bugun = "bugun";
    }

    if (taskDay) {
      taskDay = taskDay[0];
      if (!taskTime) {
        taskTime = defaultTime;
      }
    }

    if (taskTime) {
      taskTime = taskTime[0];

      if (!taskTime) {
        taskTime = defaultTime;
      }
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

    if (taskTime.split(":")[0].length == 1) {
      taskTime = "0" + taskTime;
    }

    if (taskDay.split(".")[0].length == 1) {
      taskDay = "0" + taskDay;
    }

    const timeTask = taskDay + " " + taskTime;
    taskName = cleningFromKeywords(taskName, /bugun/);
    taskName = cleningFromKeywords(taskName, /ertaga/);
    taskName = cleningFromKeywords(taskName, /\d\d:\d\d/);
    taskName = cleningFromKeywords(taskName, /\d\d.\d\d.\d\d\d\d/);

    if (taskName.trim() == "") {
      setClassName("nameError");
    } else if (!isValidDate(taskDay) || !isValidTime(taskTime)) {
      setClassName("timeError");
      setTaskName("");
    } else {
      changeTaskData({
        taskName,
        time: timeTask,
        completed: false
      });
      if (className == "") {
        setTaskName("");
      }

      // setClassName("");
    }
  }

  function changeAddTaskName(e) {
    if (e.target.value != "") {
      setClassName("");
    }
    setTaskName(e.target.value);
  }

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("sdsd", e.target.value);
      handleAddTask();
    }
  };
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
              className == ""
                ? "Yangi vazifa qo'shish"
                : className == "timeError"
                ? "Vaqtni to'g'ri kiriting mavjud bo'lmagan vaqt"
                : "Task matnini kiritish shart"
            }
            onChange={(e) => changeAddTaskName(e)}
            onKeyDown={handleEnterKeyPress}
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
