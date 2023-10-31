import { useState } from "react";
import Statistika from "./components/Statistika";
import TaskAdder from "./components/TaskAdder";
import TaskBody from "./components/TaskBody";
import Title from "./components/Title";
import data from "./utilits/data";

function App() {
  const [taskData, setTaskData] = useState(data);

  const changeTaskData =  (value) => {
    value.id=taskData.length+1
    setTaskData([value,...taskData]);
  };

  const changeTaskDataCompleted =  (id) => {
    const findTask=taskData.find(task=>task.id==id)
    findTask.completed=!findTask.completed
    setTaskData([...taskData])
  };

  const done = taskData.filter((task) => task.completed).length;
  const unfulfilled = taskData.length - done;

  return (
    <div className="container">
      <Title />
      <TaskAdder changeTaskData={changeTaskData}  />
      <TaskBody data={taskData} changeTaskDataCompleted={changeTaskDataCompleted} />
      <Statistika {...{ done, unfulfilled }} />
    </div>
  );
}

export default App;
