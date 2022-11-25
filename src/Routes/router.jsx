import { createBrowserRouter } from "react-router-dom";
import AllSeller from "../Components/Dashboard/Admin/AllSeller";
import AddProduct from "../Components/Dashboard/Seller/AddProduct";
import MyBuyers from "../Components/Dashboard/Seller/MyBuyers";
import MyProducts from "../Components/Dashboard/Seller/MyProducts";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import CategoryProducts from "../Pages/CategoryProducts";
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
      {
        path: 'categoryProducts/:category',
        element: <CategoryProducts />,
        loader: ({params}) => fetch(`http://localhost:5000/categoryProducts/${params.category}`)
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
      {
        path: '/dashboard/allSeller',
        element: <AllSeller />
      },
    ]
  }
])

export default router;