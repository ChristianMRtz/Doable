class Task {
  constructor(taskData) {
    this.toString = () => {
      return `
    <div class="task-content">
      <div class="title-content">
        <form class="js-checked-${taskData.id} check-input">
          <input type="checkbox" id="${taskData.id}" 
          class ="${taskData.important}"
          value="${taskData.completed}"
           ${taskData.completed === true ? `checked = "true"` : ""}>
          <label class="title-task ${taskData.completed === true ? "completed" : ""}">${taskData.title}</label>
        </form>
        <div class="btn-imp" id = "${taskData.important}">
          <img src="../assets/${taskData.important === true ? "important.svg" : "noneimportant.svg"}" id = "${taskData.id}"
          class="js-select-important ${taskData.completed === true ? "icon-imp" : ""}">
        </div>
      </div>
      <p class="date-task ${taskData.completed === true ? "completed-too" : ""}">${taskData.due_date === null ? "" : taskData.due_date}</p>
    </div>
    `;
    };
  }
}

export default Task;
