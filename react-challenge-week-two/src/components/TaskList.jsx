import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div>
      <h2 className='task-title'>Task List</h2>
      <p className='edit-task-paragraph'>To edit a task, click on the task name!</p>
      <ul className='task-list'>
        {tasks.map((task) => (
          <li className="tasks" key={task.id}>
            <Link to={`/task/${task.id}`}>{task.name}</Link>  
            <button className='delete-btn' onClick={() => onDelete(task.id)}>Delete</button>  
          </li>
        ))}
      </ul>
      <Link to="/task-form">
        <button className='add-new-task'>Add New Task</button>
      </Link>
    </div>
  );
};

export default TaskList;

