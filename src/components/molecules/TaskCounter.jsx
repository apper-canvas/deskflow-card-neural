import React from "react";

const TaskCounter = ({ totalTasks, completedTasks }) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {completedTasks}
        <span className="text-xl font-normal text-secondary">/{totalTasks}</span>
      </div>
      <div className="text-sm text-secondary">
        {totalTasks === 0 
          ? "No tasks yet" 
          : completedTasks === totalTasks 
            ? "All tasks completed!" 
            : "tasks completed"
        }
      </div>
    </div>
  );
};

export default TaskCounter;