import React, { Component } from "react";
import { generateRandomId } from "./utils";
// import tasks from "./tasks.json";
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
  render() {
    return (
      <tr>
        <td>{this.props.task.taskName}</td>
        <td><small>{this.props.task.taskDisc}</small></td>
        <td><small>{this.props.task.dueDate}</small></td>
        <td><small>{this.props.task.dueTime}</small></td>
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
    const dueTime = event.target.elements.dueTime;
    
    addTask(taskInput.value, taskDisc.value, dueDate.value, dueTime.value);
    taskInput.value = "";
    taskDisc.value = "";
    dueDate.value = "";
    dueTime.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="taskName" placeholder=" Task Name" />
      <input type="text" name="taskDisc" placeholder=" Description" />
      <input type="date" name="dueDate" placeholder=" Due Date" />
      <input type="time" name="dueTime" placeholder=" Due Time" />
      <button type="submit">To Do</button>
    </form>
  );
}

export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { 
      tasks: [],
      loading: true,
     };
  
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
      let url = "https://todo-json.herokuapp.com/tasks"
      fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        tasks: data,
        loading: false,
      }));
  }
  
  addTask = (taskName, taskDisc, dueDate, dueTime) => {
    const newTask = {
      taskName,
      taskDisc,
      dueDate,
      dueTime,
      finished: false,
      id: generateRandomId(),
    }
    this.setState({ tasks: [...this.state.tasks, newTask] });

    return fetch("https://todo-json.herokuapp.com/tasks", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
  
    // console.log(newTask); 
  }
  
 deleteTask = (taskId) => {
  let url = "https://todo-json.herokuapp.com/tasks"
  fetch(url + "/" + taskId, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: taskId})
  })
    // console.log('delete');
    // console.log(taskId);
    const oldTasks = this.state.tasks;
    // console.log(oldTasks);
    const newTasks = oldTasks.filter(function (tasks) {
          return tasks.id !== taskId
    });
    // // console.log(newTasks);
    this.setState({ tasks: newTasks });  
  };


  render() {
    if (this.state.loading) {
      return <h1>Loading Tasks...</h1>;
    }
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
              <td>Date</td>
              <td>Time</td>
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
