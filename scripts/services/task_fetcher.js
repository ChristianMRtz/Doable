import { apiFetch } from "./api_fetch.js";

export const TaskFetcher = function () {
  return {
    getAll: () =>
      apiFetch("tasks", "GET", {
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      }),
    create: (title) =>
      apiFetch(
        "tasks",
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: `Token token=${sessionStorage.getItem("token")}`,
        },
        {
          title,
        }
      ),
    delete: (id) =>
      apiFetch(`tasks/${id}`, "DELETE", {
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      }),
  };
};
