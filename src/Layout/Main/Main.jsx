import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../Sheard/Navbar/Navbar";
import Footer from "../../Sheard/Footer.jsx/Footer";
import Messenger from "../../Component/Main/Messenger/Messenger";
import Loading from "../../Sheard/Loading/Loading";

const Main = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="overflow-x-hidden">
      <div>
        <Navbar></Navbar>
        <div className="md:min-h-[calc(100vh-73px)] relative">
          <Outlet></Outlet>
          <Messenger></Messenger>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
