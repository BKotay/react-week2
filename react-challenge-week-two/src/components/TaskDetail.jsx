import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail = ({ tasks, onUpdate }) => {
  const { taskId } = useParams();  
  const navigate = useNavigate();  
  const task = tasks.find((task) => task.id === parseInt(taskId));  

  const [taskName, setTaskName] = useState(task ? task.name : '');  

  const handleUpdate = () => {
    onUpdate(task.id, taskName);  
    navigate('/tasks');  
  };

  if (!task) return <div>Task not found</div>;

  return (
    <div>
      <h2>Edit Task</h2>
      <input
      className='edit-task'
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleUpdate}>Save</button>
      <p className='edit-task-paragraph'>Go to the Tasks page to see your updated tasks!</p>
    </div>
  );
};

export default TaskDetail;


