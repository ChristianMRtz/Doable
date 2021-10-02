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

  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  return {
    getUserData,
    setUserData,
    getTasks,
    setTasks,
    addTask,
    deleteTask,
  };
})();

export default STORE;
