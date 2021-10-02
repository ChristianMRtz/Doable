import DOMHandler from "./scripts/dom_handler.js";
import Login from "./scripts/pages/login.js";
import Main from "./scripts/pages/main.js";
import { TaskFetcher } from "./scripts/services/task_fetcher.js";
import STORE from "./scripts/store.js";

(async () => {
  if (sessionStorage.getItem("token")) {
    try {
      const tasks = await TaskFetcher.getAll();
      STORE.setTasks(tasks);
      return DOMHandler.render(Main);
    } catch (e) {
      console.log(e);
      sessionStorage.removeItem("token");
    }
  }
  DOMHandler.render(Login);
})();
