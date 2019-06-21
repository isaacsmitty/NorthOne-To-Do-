import React, { Component } from "react";
import { generateRandomId } from "./utils";
import tasks from "./tasks.json";
import getTasks from "./task-svc.js";

class Loading extends Component {
  render() {
    return (
      <tr>
        <td colspan="2">Loading Tasks...</td>
      </tr>
    );
  }
}

function TodoListItem({ task }) {
  return (
    <tr>
      <td>{task.taskName}</td>
      <td>{task.taskDisc}</td>
      <td>{task.dueDate}</td>
      <td>
        <input type="checkbox" defaultChecked={task.finished} />
      </td>
    </tr>
  );
}

function NewTaskForm({ addTask }) {
  const onSubmit = event => {
    event.preventDefault();
    const taskInput = event.target.elements.taskName;
    const taskDisc = event.target.elements.taskDisc;
    const dueDate = event.target.elements.dueDate;
    // console.log(taskInput.value);
    addTask(taskInput.value, taskDisc.value, dueDate.value);
    taskInput.value = "";
    taskDisc.value = "";
    dueDate.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="taskName" placeholder=" Task Name" />
      <input type="text" name="taskDisc" placeholder=" Discription" />
      <input type="text" name="dueDate" placeholder=" Due Date" />
      <button type="submit">Add</button>
    </form>
  );
}
export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { tasks };

    this.addTask = this.addTask.bind(this);
  }
  addTask = (taskName, taskDisc, dueDate) => {
    const newTask = {
      taskName,
      taskDisc,
      dueDate,
      finished: false,
      id: generateRandomId()
    };
    // console.log(newTask);
    this.setState({ tasks: [...this.state.tasks, newTask] });
  };

  render() {
    const taskItems = this.state.tasks.map(task => (
      <TodoListItem key={task.id} task={task} />
    ));
    return (
      <div className="container">
        <h1>
          Get It Done! <br />
          {/* <small>For the truly industrious</small> */}
        </h1>

        <table>
          <thead>
            <tr>
              <td>Task</td>
              <td>Discription</td>
              <td>Due Date</td>
              <td>Done?</td>
            </tr>
          </thead>
          <tbody>{taskItems}</tbody>
        </table>

        <hr />
        <NewTaskForm addTask={this.addTask} />
      </div>
    );
  }
}
