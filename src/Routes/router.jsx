import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  }
])

export default router;