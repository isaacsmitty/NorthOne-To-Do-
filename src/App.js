import React, { Component } from "react";
import { generateRandomId } from "./utils";
import { axios } from 'axios';


function TodoListItem(props) {
  return (
    <tr>
      <td>{props.task.taskName}</td>
      <td><small>{props.task.taskDisc}</small></td>
      <td><small>{props.task.dueDate}</small></td>
      <td><small>{props.task.dueTime}</small></td>
      <td>
        <input type="checkbox" defaultChecked={props.task.finished} />
      </td>
      <td>
        <div onClick={props.deleteTask}><small>Remove</small></div>
      </td>
      <td>
        <div onClick={props.editTask}><small>Edit</small></div>
      </td>
    </tr>
  );
} 


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // edit: this.props.editData
      taskName: "",
      taskDisc: "",
      dueDate: "",
      dueTime: "",
    };
    this.handleChange = this.handleChange.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
}
    onSubmit = event => {
      event.preventDefault();
      const taskName = event.target.elements.taskName;
      const taskDisc = event.target.elements.taskDisc;
      const dueDate = event.target.elements.dueDate;
      const dueTime = event.target.elements.dueTime;
      const taskId = this.props.editData.id;

      // this.setState = {}
     
      this.props.updateTask(taskId, taskName.value, taskDisc.value, dueDate.value, dueTime.value);

      // taskName.value = "";
      // taskDisc.value = "";
      // dueDate.value = "";
      // dueTime.value = "";
       
    };
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

  
    componentWillReceiveProps(nextProps){
      if (nextProps.editData.taskName !== this.state.taskName) {
        this.setState({ 
          taskName: nextProps.editData.taskName,
          taskDisc: nextProps.editData.taskDisc,
          dueDate: nextProps.editData.dueDate,
          dueTime: nextProps.editData.dueTime,
         });
      }
    }  
  render(){
    if (this.props.isEditing) {
    return (
      <form onSubmit={this.onSubmit}>
      {/* {console.log(this.editData)} */}
      {console.log(this.props.editData.taskName)}
      {console.log(this.state)}
        <input type="text" name="taskName" value={this.state.taskName} 
          onChange={this.handleChange}/>
        <input type="text" name="taskDisc" value={this.state.taskDisc} 
          onChange={this.handleChange}/>
        <input type="date" name="dueDate" value={this.state.dueDate} 
          onChange={this.handleChange}/>
        <input type="time" name="dueTime" value={this.state.dueTime} 
          onChange={this.handleChange}/>
        <button type="submit"> Edit </button>
      </form>
    );
  } else {
    return (
      null
    )
  }
}
}
function NewTaskForm(props) {
  const onSubmit = event => {
    event.preventDefault();
    const taskInput = event.target.elements.taskName;
    const taskDisc = event.target.elements.taskDisc;
    const dueDate = event.target.elements.dueDate;
    const dueTime = event.target.elements.dueTime;
    
    props.addTask(taskInput.value, taskDisc.value, dueDate.value, dueTime.value);
    taskInput.value = "";
    taskDisc.value = "";
    dueDate.value = "";
    dueTime.value = "";
        
  };
  if (!props.isEditing) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="taskName" placeholder=" Task Name" />
      <input type="text" name="taskDisc" placeholder=" Description" />
      <input type="date" name="dueDate" placeholder=" Due Date" />
      <input type="time" name="dueTime" placeholder=" Due Time" />
      <button type="submit">To Do</button>
    </form>
  );
  } else {
    return (
      <div></div>
    )
  }
}

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
              fetch("https://todo-json.herokuapp.com/tasks", {
                method: 'PATCH',
                body: JSON.stringify({
                 tasks
                })
              }).then((response) => {
                response.json().then((response) => {
                  console.log(response);
                })
              }).catch(err => {
                console.error(err)
              })
  }

  render() {
    // if (this.state.isEditing){
    //   return <Edit editTask={this.state.edit.task} isEditing={this.state.isEditing} 
    //   loading={this.state.loading }/>
    // }
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
              {/* // handleChange={this.handleChange} /> */}
        
      </div>
    );

  }
  
}
