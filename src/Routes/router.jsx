import { createBrowserRouter } from "react-router-dom";
import AllBuyer from "../Components/Dashboard/Admin/AllBuyer";
import AllSeller from "../Components/Dashboard/Admin/AllSeller";
import ReportedItems from "../Components/Dashboard/Admin/ReportedItems";
import Payment from "../Components/Dashboard/Paymnet/Payment";
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
import PrivateRoute from "./PrivateRoute";

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
        path: 'myOrders',
        element: <MyOrders />
      },
      {
        path: 'categoryProducts/:category',
        element: <PrivateRoute><CategoryProducts /></PrivateRoute>,
        loader: ({ params }) => fetch(`https://y-mauve-alpha.vercel.app/categoryProducts/${params?.category}`)
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
      {
        path: '/dashboard/reportedItems',
        element: <ReportedItems />
      },
      {
        path: '/dashboard/payment/:id',
        element: <Payment />,
        loader: ({ params }) => fetch(`https://y-mauve-alpha.vercel.app/dashboard/payment/${params.id}`)
      }
    ]
  }
])

export default router;