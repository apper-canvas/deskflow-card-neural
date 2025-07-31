import React from "react";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const TaskItem = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex items-center gap-3 p-4 bg-surface rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
    >
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      
      <span
        className={cn(
          "flex-1 text-base transition-all duration-200",
          task.completed 
            ? "task-completed text-secondary" 
            : "text-gray-900"
        )}
      >
        {task.text}
      </span>
      
      <Button
        variant="ghost"
        size="small"
        onClick={() => onDeleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-error"
      >
        <ApperIcon name="Trash2" size={16} />
      </Button>
    </motion.div>
  );
};

export default TaskItem;