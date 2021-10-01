import { apiFetch } from "./api_fetch.js";

export const SessionsFetcher = (function () {
  return {
    login: (email, password) =>
      apiFetch(
        "login",
        "POST",
        {
          "Content-Type": "application/json",
        },
        { email, password }
      ),
      logout: () => 
      apiFetch("logout", "DELETE", {
        Authorization: `Token token=${sessionStorage.getItem("token")}`,
      })
  };
})();
