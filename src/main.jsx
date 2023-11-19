import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./app.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Route.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import CheckoutProvider from "./context/CheckoutProvider.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CheckoutProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </QueryClientProvider>
      </CheckoutProvider>
    </AuthProvider>
  </React.StrictMode>
);
