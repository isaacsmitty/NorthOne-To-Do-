import React from "react";

export function TodoListItem(props) {
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