import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName) {
      onAdd(taskName);  
      setTaskName('');  
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <input
      className='edit-task'
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />
      <button type="submit">Add Task</button>
      <p className='edit-task-paragraph'>Go to the Tasks page to see your updated tasks!</p>
    </form>
  );
};

export default TaskForm;

