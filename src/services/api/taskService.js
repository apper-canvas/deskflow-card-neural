import taskData from "@/services/mockData/tasks.json";

let tasks = [...taskData];

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.unshift(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasks[index] = { 
      ...tasks[index], 
      ...updates,
      completedAt: updates.completed ? new Date().toISOString() : null
    };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const deleted = tasks.splice(index, 1)[0];
    return { ...deleted };
  },

  async clearCompleted() {
    await delay(300);
    const completedTasks = tasks.filter(t => t.completed);
    tasks = tasks.filter(t => !t.completed);
    return completedTasks.length;
  }
};