import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const navigateToLogin = () => {
  history.push("/login");
};

export default history;
