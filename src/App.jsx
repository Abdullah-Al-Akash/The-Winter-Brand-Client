import React from "react";
import { useRoutes, useLocation, useScrollToTop } from 'react-router-dom';
import { router } from "./Route/Route";

const App = () => {
  const location = useLocation();
  useScrollToTop(location);

  return useRoutes(router);
};

export default App;
