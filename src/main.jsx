import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Route.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import CheckoutProvider from "./context/checkoutProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CheckoutProvider>
          <RouterProvider router={router} />
        </CheckoutProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
