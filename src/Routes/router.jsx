import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/Dashboard/Seller/AddProduct";
import MyBuyers from "../Components/Dashboard/Seller/MyBuyers";
import MyProducts from "../Components/Dashboard/Seller/MyProducts";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard',
        element: <AddProduct />
      },
      {
        path: '/dashboard/myProducts',
        element: <MyProducts />
      },
      {
        path: '/dashboard/myBuyers',
        element: <MyBuyers />
      },
    ]
  }
])

export default router;