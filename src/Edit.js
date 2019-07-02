import React, { Component } from "react";

export class Edit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        taskName: "",
        taskDisc: "",
        dueDate: "",
        dueTime: "",
      };
      this.handleChange = this.handleChange.bind(this);
  }
      onSubmit = event => {
        event.preventDefault();
        const taskName = event.target.elements.taskName;
        const taskDisc = event.target.elements.taskDisc;
        const dueDate = event.target.elements.dueDate;
        const dueTime = event.target.elements.dueTime;
        const taskId = this.props.editData.id;
       
        this.props.updateTask(taskId, taskName.value, taskDisc.value, dueDate.value, dueTime.value)
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
        {/* {console.log(this.state)} */}
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

//   export default Edit;