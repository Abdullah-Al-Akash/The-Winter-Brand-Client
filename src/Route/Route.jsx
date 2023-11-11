import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Main/Home/Home";
import About from "../Pages/Main/About/About";
import Contact from "../Pages/Main/Contact/Contact";
import Reviews from "../Pages/Main/Reviews/Reviews";
import Faq from "../Pages/Main/FAQ/Faq";
import Login from "../Pages/Main/Login/Login";
import Products from "../Pages/Main/Products/Products";
import Register from "../Pages/Main/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Checkout from "../Pages/Main/Checkout/Checkout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllProducts from "../Pages/Dashboard/AllProducts/AllProducts";
import AddFeature from "../Pages/Dashboard/AddFeature/AddFeature";
import AllFeature from "../Pages/Dashboard/AllFeature/AllFeature";
import PostFaq from "../Pages/Dashboard/PostFaq/PostFaq";
import ViewFaq from "../Pages/Dashboard/ViewFaq/ViewFaq";
import PendingReview from "../Pages/Dashboard/PendingReview/PendingReview";
import AllReview from "../Pages/Dashboard/AllReview/AllReview";
import ManageOrder from "../Pages/Dashboard/ManageOrder/ManageOrder";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AdminContact from "../Pages/Dashboard/AdminContact/AdminContact";
import Cart from "../Pages/Main/Cart/Cart";
import EmailMarketing from "../Pages/Dashboard/EmailMarketing/EmailMarketing";
import NumberMarketing from "../Pages/Dashboard/NumberMarketing/NumberMarketing";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ErrorPage from "../Sheard/ErrorPage/ErrorPage";
import UserProfile from "../Component/Main/UserProfile/UserProfile";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/reviews",
        element: <Reviews></Reviews>,
      },
      {
        path: "/faq",
        element: <Faq></Faq>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/all-product",
        element: <Products></Products>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/dashboard/add-feature",
        element: <AddFeature></AddFeature>,
      },
      {
        path: "/dashboard/all-feature",
        element: <AllFeature></AllFeature>,
      },
      {
        path: "/dashboard/post-faq",
        element: <PostFaq></PostFaq>,
      },
      {
        path: "/dashboard/view-faq",
        element: <ViewFaq></ViewFaq>,
      },
      {
        path: "/dashboard/pending-review",
        element: <PendingReview></PendingReview>,
      },
      {
        path: "/dashboard/all-review",
        element: <AllReview></AllReview>,
      },
      {
        path: "/dashboard/manage-order",
        element: <ManageOrder></ManageOrder>,
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/contact",
        element: <AdminContact></AdminContact>,
      },
      {
        path: "/dashboard/email-marketing",
        element: <EmailMarketing></EmailMarketing>,
      },
      {
        path: "/dashboard/number-marketing",
        element: <NumberMarketing></NumberMarketing>,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);
