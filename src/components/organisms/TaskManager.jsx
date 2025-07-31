import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import TaskCounter from "@/components/molecules/TaskCounter";
import TaskInput from "@/components/molecules/TaskInput";
import TaskItem from "@/components/molecules/TaskItem";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { taskService } from "@/services/api/taskService";

const TaskManager = () => {
const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  // Load tasks from database on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await taskService.getAll();
      setTasks(result);
    } catch (err) {
      console.error("Error loading tasks:", err.message);
      setError("Failed to load tasks. Please try again.");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

const addTask = async (text) => {
    try {
      const newTask = await taskService.create({
        Name: text,
        completed_c: false,
        createdAt_c: new Date().toISOString(),
        completedAt_c: null
      });
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch (err) {
      console.error("Error adding task:", err.message);
      toast.error("Failed to add task");
    }
  };

  const toggleTaskComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;
      
      const isCompleting = !task.completed_c;
      const updatedTask = await taskService.update(taskId, {
        completed_c: isCompleting,
        completedAt_c: isCompleting ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));
    } catch (err) {
      console.error("Error updating task:", err.message);
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.info("Task deleted");
    } catch (err) {
      console.error("Error deleting task:", err.message);
      toast.error("Failed to delete task");
    }
  };

  const clearCompleted = async () => {
    try {
      const completedCount = await taskService.clearCompleted();
      if (completedCount > 0) {
        setTasks(prev => prev.filter(task => !task.completed_c));
        toast.success(`${completedCount} completed task${completedCount === 1 ? '' : 's'} cleared`);
      }
    } catch (err) {
      console.error("Error clearing completed tasks:", err.message);
      toast.error("Failed to clear completed tasks");
    }
  };

const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed_c).length;
  const hasCompletedTasks = completedTasks > 0;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error title="Error Loading Tasks" message={error} onRetry={loadTasks} />;
  }

return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header with Counter and Logout */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1"></div>
          <h1 className="text-4xl font-bold text-gray-900">DeskFlow</h1>
          <div className="flex-1 flex justify-end">
            <Button
              variant="secondary"
              onClick={logout}
              className="text-sm"
            >
              <ApperIcon name="LogOut" size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
        {user && (
          <p className="text-gray-600 mb-4">Welcome back, {user.firstName || user.name || 'User'}!</p>
        )}
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
                key={task.Id}
                task={{
                  Id: task.Id,
                  text: task.Name,
                  completed: task.completed_c,
                  createdAt: task.createdAt_c,
                  completedAt: task.completedAt_c
                }}
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
}
export default TaskManager;