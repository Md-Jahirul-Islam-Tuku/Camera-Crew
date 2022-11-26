import { createBrowserRouter } from "react-router-dom";
import AllBuyer from "../Components/Dashboard/Admin/AllBuyer";
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
import MyOrders from "../Pages/MyOrders";
import SignUp from "../Pages/SignUp";
import Blog from "../Shared/Blog";

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
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'myOrders/:email',
        element: <MyOrders />,
        loader: ({ params }) => fetch(`http://localhost:5000/myOrders/${params.email}`)
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
      {
        path: '/dashboard/allBuyer',
        element: <AllBuyer />
      },
    ]
  }
])

export default router;