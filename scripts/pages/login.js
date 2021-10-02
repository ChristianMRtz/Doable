import DOMHandler from "../dom_handler.js";
import { SessionsFetcher } from "../services/sessions_fetcher.js";
import { TaskFetcher } from "../services/task_fetcher.js";
import STORE from "../store.js";
import Main from "./main.js";

const Login = (() => {
  async function loginUser(e) {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      const userData = await SessionsFetcher.login(email.value, password.value);
      STORE.setUserData(userData);
      sessionStorage.setItem('token', userData.token)
      const tasks = await TaskFetcher.getAll();
      STORE.setTasks(tasks)
    } catch (e) {
      console.log(e);
      alert(e);
    }
    DOMHandler.render(Main);
  }

  return {
    render: () => `
          <header class="header">
            <img src="../assets/doable.svg" class="title-header">
          </header>
          
          <form class="js-form form-content">
            <p class="text-form">Email</p>
            <input type="text" name="email" placeholder="you@example.com" class="input-form">
            <p class="text-form">Password</p>
            <input type="password" name="password" placeholder="******" class="input-form">
            <button type="submit" class="btn-submit-form">Login</button>
            <div class="anchor"><a class="create-account_login">Create account</a></div>
          </form>
          `,
    addEventListeners: () => {
      const form = document.querySelector(".js-form");
      form.addEventListener("submit", loginUser);
    },
  };
})();

export default Login;
