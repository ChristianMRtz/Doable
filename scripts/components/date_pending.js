
import Task from "../components/tasks.js";
import DOMHandler from "../dom_handler.js";
import Importance from "../pages/importance.js";
import Important from "../pages/important.js";
import Main from "../pages/main.js";
import Pending from "../pages/pending.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";



const DatesP = (() => {
  
  let enabledSettings = []

  async function createTask(e) {
    e.preventDefault();
    const { title, due_date } = e.target;
    const newTask = await TaskFetcher.create(title.value, due_date.value);
    STORE.addTask(newTask);
    DOMHandler.render(Main);
  }

  function optionOrder(e) {
    e.preventDefault();
    if (this.value == "alphabetical") {
      DOMHandler.render(Main);
    } else if (this.value == "importance") {
      DOMHandler.render(Importance);
    }
  }

  function changeOption() {
    const options = enabledSettings
    if (options.length === 0){
      DOMHandler.render(Main)
    }
    else if (options[0] === "pending"){
      DOMHandler.render(Pending)
    }
    else if (options[0] === "important"){
      DOMHandler.render(Important)
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

  async function editBoolean(e) {
      e.preventDefault();
      const id = parseInt(e.target.id);
      const important = e.target.class;
      const completed = e.target.checked;
      try {
        const editTask = await TaskFetcher.update(id, important, completed);
        const newData = {
          important: editTask.important,
          completed: editTask.completed,
        }
        STORE.updateTask(id, newData);
        DOMHandler.render(Main);
      } catch (e) {
        console.log(e);
        alert(e);
      }
  }

  async function editImportant(e) {
    const check = e.target.closest(".js-select-important")
    const checkImportant = check.closest(".btn-imp")
    if (check){
      e.preventDefault();
      const id = parseInt(check.id);
      const important = checkImportant.id === "false" ? true : false;
      try {
        const editTask = await TaskFetcher.update(id, important);
        const newData = {
          important: editTask.important,
        }
        STORE.updateTask(id, newData);
        DOMHandler.render(DatesP);
      } catch (e) {
        console.log(e);
        alert(e);
      }
    }
  }

  function generateTasks() {
    const tasks = STORE.getTasks();
    const taskord = tasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).reverse();
    return taskord.filter(task => task.completed === false).map((taskData) => new Task(taskData)).join("");
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
        <option value="date" selected="selected">Due date</option>
        <option value="importance">Importance</option>
      </select>
    </div>
    <div class="select-option">
      <label class="title-option">Show</label>
      <form class="option-view">
        <input type="checkbox" id="pending" name = "js-options"  value="pending" checked = "true">
        <label for="pending" class="options-view"> Only pending</label>
        <input type="checkbox" id="important" name = "js-options"  value="important">
        <label for="important" class="options-view"> Only important</label>
      </form>
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
            const editbtn = document.querySelector(`.content`);
      editbtn.addEventListener("change", editBoolean);
      const editImportants = document.querySelector(`.content`);
      editImportants.addEventListener("click", editImportant);
      const checkboxes = document.querySelectorAll(
        "input[type=checkbox][name=js-options]"
      );
      checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
          enabledSettings = 
            Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
            .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
            .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
            changeOption()
        })
      });
    },
  };
})();

export default DatesP;
