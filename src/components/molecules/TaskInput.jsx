import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskInput = ({ onAddTask, className }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-3">
        <Input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 h-12 text-base"
          autoFocus
        />
        <Button
          type="submit"
          disabled={!taskText.trim()}
          className="h-12 px-6"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Add
        </Button>
      </div>
    </form>
  );
};

export default TaskInput;