import React, { Component } from "react";

export function NewTaskForm(props) {
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
        null
      )
    }
}