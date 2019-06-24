import React, { Component } from "react";
import { generateRandomId } from "./utils";
import tasks from "./tasks.json";
// import getTasks from "./task-svc.js";

// class Loading extends Component {
//   render() {
//     return (
//       <tr>
//         <td colspan="2">Loading Tasks...</td>
//       </tr>
//     );
//   }
// }

class TodoListItem extends Component {
  // const onClick = event => {
  // deleteTask(task.taskName);
  // }
  render() {
  return (
    <tr>
      <td>{this.props.task.taskName}</td>
      <td><small>{this.props.task.taskDisc}</small></td>
      <td><small>{this.props.task.dueDate}</small></td>
      <td>
        <input type="checkbox" defaultChecked={this.props.task.finished} />
      </td>
      <td>
      <div onClick={this.props.deleteTask}><small>Remove</small></div>
      </td>
    </tr>
  );
}
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
      <input type="text" name="taskDisc" placeholder=" Description" />
      <input type="text" name="dueDate" placeholder=" Due Date" />
      <button type="submit">To Do</button>
    </form>
  );
}
// function deleteTask (taskId) {
//   console.log('delete');
//  const oldTasks = tasks;
//  const newTasks = oldTasks.filter(task.id => task.id !== taskId);
//  this.setState({ tasks: newTasks });
// }
export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { tasks };

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  addTask = (taskName, taskDisc, dueDate) => {
    const newTask = {
      taskName,
      taskDisc,
      dueDate,
      finished: false,
      id: generateRandomId(),
    };
    // console.log(newTask);
    this.setState({ tasks: [...this.state.tasks, newTask] });
  }
  
 deleteTask = (taskId) => {
    console.log('delete');
    console.log(taskId);
    // const newTasks = this.state.tasks.splice(this.state.tasks.indexOf(taskId), 1);
    const oldTasks = this.state.tasks;
    console.log(oldTasks);
    const newTasks = oldTasks.filter(function (tasks) {
          return tasks.id !== taskId
    });
    console.log(newTasks);
    this.setState({ tasks: newTasks });
  };


  render() {
    const taskItems = this.state.tasks.map(task => (
    <TodoListItem key={task.id} task={task}
      deleteTask={() => this.deleteTask(task.id)}
      />
      // console.log(task.id)
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
              <td>Description</td>
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
