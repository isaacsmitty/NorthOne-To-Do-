import React, { Component } from "react";
import { generateRandomId } from "./utils";
import { TodoListItem } from "./ToDoListItem"
import { NewTaskForm } from "./NewTaskForm"
import { Edit } from "./Edit"

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tasks: [],
      loading: true,
      isEditing: false,
      edit: {},
     };
  
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
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

  editTask = (index) => {
    this.setState({
      isEditing: true,
      edit: this.state.tasks[index],
    })
  }

  updateTask = (taskId, taskName, taskDisc, dueDate, dueTime) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex((task) => task.id === taskId)
    
    tasks[index].taskName = taskName
    tasks[index].taskDisc = taskDisc
    tasks[index].dueDate = dueDate
    tasks[index].dueTime = dueTime
    this.setState({
                 tasks,
                 isEditing: false,
              });
          
              return fetch("https://todo-json.herokuapp.com/tasks" + "/" + taskId, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                 this.state.tasks[index]
                 )
              }).then((res) => {
                res.json().then((res) => {
                  console.log(res);
                })
              }).catch(err => {
                console.error(err)
              })
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading Tasks...</h1>;
    }
    const taskItems = this.state.tasks.map((task, index) => (
    <TodoListItem key={task.id} task={task}
      deleteTask={() => this.deleteTask(task.id)}
      editTask={() => this.editTask(index)}
      />
      // console.log(task.id)
    ));
    return (
      <div className="container">
        <h1>
          Get It Done! <br />
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

        <NewTaskForm addTask={this.addTask} isEditing={this.state.isEditing} />
        <Edit editData={this.state.edit} isEditing={this.state.isEditing} 
              updateTask={this.updateTask} />      
      </div>
    );
  } 
}
