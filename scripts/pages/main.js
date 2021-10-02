import DOMHandler from "../dom_handler.js";
import { SessionsFetcher } from "../services/sessions_fetcher.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";
import Dates from "./date_task.js";
import Importance from "./importance.js";
import Important from "./important.js";
import Login from "./login.js";
import Pending from "./pending.js";

const Main = (() => {
  let enabledSettings = [];

  async function createTask(e) {
    e.preventDefault();
    const { title, due_date } = e.target;
    if (title.value.length > 0) {
      const newTask = await TaskFetcher.create(title.value, due_date.value);
      STORE.addTask(newTask);
      DOMHandler.render(Main);
    } else {
      alert("Title is empty");
    }
  }

  function optionOrder(e) {
    e.preventDefault();
    if (this.value == "date") {
      DOMHandler.render(Dates);
    } else if (this.value == "importance") {
      DOMHandler.render(Importance);
    }
  }
  function changeOption() {
    const options = enabledSettings;
    if (options.length === 0) {
      DOMHandler.render(Main);
    } else if (options[0] === "pending") {
      DOMHandler.render(Pending);
    } else if (options[0] === "important") {
      DOMHandler.render(Important);
    }
  }

  async function goToLogout(e) {
    const logoutConf = confirm("Are you sure you want to log out?");
    if (logoutConf === true) {
      e.preventDefault();
      try {
        await SessionsFetcher.logout();
        sessionStorage.removeItem("token");
        STORE.clear();
        DOMHandler.render(Login);
      } catch (e) {
        alert(e);
      }
    } else {
      DOMHandler.render(Main);
    }
  }

  function generateTasks() {
    const tasks = STORE.getTasks();
    const taskord = tasks.sort((a, b) => a.title.localeCompare(b.title));
    return taskord
      .map(
        (task) => `
      <div class="task-content">
        <div class="title-content">
          <div class="check-input">
            <input type="checkbox" id="${task.id}" value="${task.title}" ${
          task.completed === true ? `checked = "true"` : ""
        }>
            <label class="title-task ${
              task.completed === true ? "completed" : ""
            }">${task.title}</label>
          </div>
          <div class="btn-imp">
            <img src="../assets/${
              task.important === true ? "important.svg" : "noneimportant.svg"
            }" class="${task.completed === true ? "icon-imp" : ""}">
          </div>
        </div>
        <p class="date-task ${
          task.completed === true ? "completed-too" : ""
        }">${task.due_date === null ? "" : task.due_date}</p>
      </div>
      `
      )
      .join("");
  }

  return {
    render: () => `  
  <header class="header">
    <img src="../assets/doable.svg" class="title-header">
    <img src="../assets/logout.svg" class="js-logout logout-header">
  </header>
  <div class="options">
    <div class="list-option">
      <label class="title-option">Sort</label>
      <select id="option_order" class ="js-selected">
        <option value="alphabetical">Alphabetical (a-z)</option>
        <option value="date">Due date</option>
        <option value="importance">Importance</option>
      </select>
    </div>
    <div class="select-option">
      <label class="title-option">Show</label>
      <div class="option-view">
        <input type="checkbox" id="pending" name = "js-options" value="pending">
        <label for="pending" class="options-view"> Only pending</label>
        <input type="checkbox" id="important" name = "js-options" value="important">
        <label for="important" class="options-view"> Only important</label>
      </div>
    </div>
  </div>
  <div class="content">

  ${generateTasks()}
  <div class="space">
  </div>
  </div>
  <footer class="js-form-footer footer-form">
    <form>
      <input type="text" name="title" placeholder="do the dishes..." class="input-footer">
      <input type="date" name="due_date" class="input-footer">
      <button type="submit"  class="btn-submit">Add Task</button>
    </form>
  </footer>
  `,
    addEventListeners: () => {
      const form = document.querySelector(".js-form-footer");
      form.addEventListener("submit", createTask);
      const selected = document.querySelector(".js-selected");
      selected.addEventListener("change", optionOrder);
      const btnLogout = document.querySelector(".js-logout");
      btnLogout.addEventListener("click", goToLogout);
      const checkboxes = document.querySelectorAll(
        "input[type=checkbox][name=js-options]"
      );
      checkboxes.forEach(function (checkboxed) {
        checkboxed.addEventListener("change", function () {
          enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
            .filter((i) => i.checked) // Use Array.filter to remove unchecked checkboxes.
            .map((i) => i.value); // Use Array.map to extract only the checkbox values from the array of objects.
          changeOption();
        });
      });
    },
  };
})();

export default Main;
