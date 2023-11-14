/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext, useAuth } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const { user } = useAuth();
  console.log(13, user);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [errorMassage, setErrorMassage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { signUp } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { axiosSecure } = useAxiosSecure();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e?.target;
    const email = form?.email?.value;
    const name = form?.name?.value;
    const password = form?.password?.value;
    if (password < 6) {
      setErrorMassage("Minimum six characters provide your password");
      setSuccessMessage("");
      return;
    } else if (!/^(?=.*[A-Za-z])/.test(password)) {
      setErrorMassage("At least one letter");
      setSuccessMessage("");
    } else {
      signUp(email, password)
        .then((result) => {
          const saveUser = result.user;
          console.log(saveUser);
          axiosSecure
            .post("/user-registration", {
              name: name,
              email: saveUser.email,
            })
            .then((data) => {
              if (data?.data?.success) {
                toast("Register successful!");
                form.reset();
                navigate(from, { replace: true });
                setErrorMassage("");
                setSuccessMessage("");
              }
            });
        })
        .catch((err) => {
          console.log(err.message);
          setErrorMassage(err.message);
          setSuccessMessage("");
        });
    }
  };
  const handleEmail = (e) => {
    const emailHandle = e.target.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailHandle)) {
      setErrorMassage("Email are not valid");
      return;
    } else {
      setErrorMassage("");
      setSuccessMessage("Email validation is complete");
    }
  };
  const handlePassword = (e) => {
    const passwordHandle = e.target.value;
    // console.log(passwordHandle);
    if (passwordHandle.length < 6) {
      setErrorMassage("Minimum six characters provide your password");
      setSuccessMessage("");
      return;
    } else if (!/^(?=.*[A-Za-z])/.test(passwordHandle)) {
      setErrorMassage("At least one letter");
      setSuccessMessage("");
    } else {
      setErrorMassage("");
      setSuccessMessage("The password is hard to complete");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2 md:px-0">
      <div className="flex flex-col justify-center items-center">
        <h2 className="my-5 text-2xl font-semibold">
          Create your The Winter Brand account
        </h2>
        <div className="md:w-[400px]">
          <form
            onSubmit={handleRegister}
            className="flex flex-col justify-start items-start w-full md:w-[400px]"
          >
            <div className="flex flex-col md:w-[400px] w-full">
              <label htmlFor="name" className="py-5">
                <span className="text-red-600">*</span>Name
              </label>
              <input
                className="outline-none border-2 px-3 py-1"
                type="text"
                name="name"
                placeholder="enter your name"
                id="name"
              />
            </div>

            <div className="flex flex-col md:w-[400px] w-full">
              <label htmlFor="email" className="py-5">
                <span className="text-red-600">*</span> Email Address
              </label>
              <input
                className="outline-none border-2 px-3 py-1"
                type="email"
                name="email"
                onChange={handleEmail}
                placeholder="email"
              />
            </div>
            <div className="flex flex-col md:w-[400px] w-full">
              <label htmlFor="Password" className="py-5">
                <span className="text-red-600">*</span> Password
              </label>

              <div className="relative">
                <input
                  type={toggleIcon ? "password" : "text"}
                  className="outline-none border-2 px-3 py-1 w-full"
                  name="password"
                  placeholder="Password"
                  onChange={handlePassword}
                />
                {errorMassage && <p className="text-red-600">{errorMassage}</p>}
                {successMessage && (
                  <p className="text-green-600">{successMessage}</p>
                )}
                <div className="absolute top-2 right-4 text-xl cursor-pointer">
                  {toggleIcon ? (
                    <FaEye onClick={() => setToggleIcon(!toggleIcon)}></FaEye>
                  ) : (
                    <FaEyeSlash
                      onClick={() => setToggleIcon(!toggleIcon)}
                    ></FaEyeSlash>
                  )}
                </div>
              </div>
            </div>
            <button
              className="brand-btn text-white py-2 w-full my-3"
              type="submit"

            >Create account</button>
          </form>
          <p>
            Already have an Account?
            <span className="text-[#4CA7FF] font-medium">
              <Link to="/login">Please Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
