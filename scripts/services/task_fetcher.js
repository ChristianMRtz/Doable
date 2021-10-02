import { apiFetch } from "./api_fetch.js";

export const TaskFetcher = (function () {
  return {
    getAll: () =>
      apiFetch("tasks", "GET", {
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      }),
    create: (title, due_date) =>
      apiFetch(
        "tasks",
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
        },
        { title, due_date }
      ),
    update: (id, important, completed) =>
      apiFetch(
        `tasks/${id}`,
        "PATCH",
        {
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        { important, completed }
      ),
    delete: (id) =>
      apiFetch(`tasks/${id}`, "DELETE", {
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      }),
  };
})();
