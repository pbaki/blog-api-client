import { createBrowserRouter } from "react-router-dom";
import Settings from "./user_type/user/settings/settings";
import Nav from "./user_type/user/nav/nav";
import Mainpage from "./user_type/user/mainpage/mainpage";
import Login from "./user_type/login/login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Mainpage />
      </>
    ),
  },
  {
    path: "/settings",
    element: (
      <>
        <Nav />
        <Settings />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Nav />
        <Login />
      </>
    ),
  },
]);

export default Router;
