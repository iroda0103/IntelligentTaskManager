import { useState } from "react";
import Statistika from "./components/Statistika";
import TaskAdder from "./components/TaskAdder";
import TaskBody from "./components/TaskBody";
import Title from "./components/Title";

function App() {
  const data = localStorage.getItem("data");
  const [taskData, setTaskData] = useState(data ? JSON.parse(data) : []);

  const changeTaskData = (value) => {
    value.id = taskData.length + 1;
    localStorage.setItem("data", JSON.stringify([value, ...taskData]));
    setTaskData([value, ...taskData]);
  };

  const changeTaskDataCompleted = (id) => {
    const findTask = taskData.find((task) => task.id == id);
    findTask.completed = !findTask.completed;
    setTaskData([...taskData]);
  };

  const done = taskData?.filter((task) => task.completed).length;
  const unfulfilled = taskData?.length - done;

  return (
    <div className="container">
      <Title />
      <TaskAdder changeTaskData={changeTaskData} />
      <TaskBody
        data={taskData}
        changeTaskDataCompleted={changeTaskDataCompleted}
      />
      <Statistika {...{ done, unfulfilled }} />
    </div>
  );
}

export default App;
