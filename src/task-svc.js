import tasks from "./tasks.json";
import { generateRandomId } from "./utils";

// function delay(t) {
//   return new Promise(res => {
//     setTimeout(res, t);
//   });
// }
// const delayResolve = (value, t = 2000) => {
//   return delay(t).then(() => value);
// };

// () => Promise<Tasks[]>
export const getTasks = () => tasks.map(task => ({ ...task }));

// (taskName:String) => Promise<Task>
export const addTask = (taskName, taskDisc, dueDate) => {
  const newTask = {
    taskName,
    taskDisc,
    dueDate,
    finished: false,
    id: generateRandomId()
  };
  tasks.push(newTask);
  return { ...newTask };
};

// (id:String) => Promise<Task>
export const toggleTask = id => {
  const foundTask = tasks.find(t => t.id === id);
  if (foundTask) {
    foundTask.finished = !foundTask.finished;
  }
  console.log("Toggled:", id, tasks);
  return foundTask && { ...foundTask };
};
