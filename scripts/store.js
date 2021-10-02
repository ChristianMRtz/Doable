const STORE = (function () {
  let userData = {};
  let tasks = [];

  function getUserData() {
    return { ...userData };
  }

  function getTasks() {
    return [...tasks];
  }

  function setUserData(data) {
    userData = data;
  }

  function setTasks(_tasks) {
    tasks = _tasks;
  }

  function addTask(newTask) {
    tasks = [...tasks, newTask];
  }

  function updateTask(id, data) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...data };
      }
      return task;
    });
  }

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  function clear() {
    this.userData = {};
    this.tasks = [];
  }

  return {
    getUserData,
    setUserData,
    getTasks,
    setTasks,
    addTask,
    deleteTask,
    updateTask,
    clear,
  };
})();

export default STORE;
