import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskInput from "@/components/molecules/TaskInput";
import TaskItem from "@/components/molecules/TaskItem";
import TaskCounter from "@/components/molecules/TaskCounter";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("deskflow-tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("deskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast.success("Task added successfully!");
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const isCompleting = !task.completed;
        return {
          ...task,
          completed: isCompleting,
          completedAt: isCompleting ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast.info("Task deleted");
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    if (completedCount > 0) {
      setTasks(prev => prev.filter(task => !task.completed));
      toast.success(`${completedCount} completed task${completedCount === 1 ? '' : 's'} cleared`);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const hasCompletedTasks = completedTasks > 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header with Counter */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">DeskFlow</h1>
        <TaskCounter totalTasks={totalTasks} completedTasks={completedTasks} />
      </div>

      {/* Task Input */}
      <TaskInput onAddTask={addTask} className="mb-8" />

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <Empty
            title="No tasks yet"
            description="Add your first task to get started with DeskFlow"
            actionText="Add Task"
            onAction={() => document.querySelector('input')?.focus()}
          />
        ) : (
          <AnimatePresence>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Clear Completed Button */}
      {hasCompletedTasks && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <Button
            variant="secondary"
            onClick={clearCompleted}
            className="text-secondary hover:text-gray-700"
          >
            <ApperIcon name="Trash2" size={16} className="mr-2" />
            Clear {completedTasks} completed task{completedTasks === 1 ? '' : 's'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default TaskManager;