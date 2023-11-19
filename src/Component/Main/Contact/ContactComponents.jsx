import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContactComponents = () => {
  const { axiosSecure } = useAxiosSecure();
  const handleContact = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from?.name?.value;
    const email = from?.email?.value;
    const needDate = from?.need?.value;
    const message = from?.message?.value;
    const postedContactObject = {
      name: name,
      email: email,
      need: needDate,
      message: message,
    };
    axiosSecure
      .post("/create-contact", postedContactObject)
      .then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            title: "Update!",
            text: "Send Massage by admin successfully.",
            icon: "success",
          });
          from.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="md:max-w-[700px] md:mx-auto my-10 md:my-[100px] mx-5">
      <div className="flex flex-col justify-center  w-full md:w-[80%] mx-auto items-center md:gap-10 gap-5">
        <h1 className="md:text-6xl text-xl font-bold">Hello, how are you? </h1>
        <p className="md:text-xl text-[12px] text-center">
          Would you like to Beanie a talk? Or just want to send me a message?
          Either is fine! just fill in the form below and i'll get back to you
          as soon as o can.
        </p>
      </div>
      <form onSubmit={handleContact} className="contactForm-Shadow">
        <div className="p-10 border mt-5 flex flex-col gap-4 contactForm-OverlayShadow  ">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-slate-500 font-semibold">
              Name
            </label>
            <input
              type="text"
              className="outline-none bg-gray-200 w-full py-3 px-2"
              name="name"
              placeholder="Enter You Name"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-slate-500 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              className="outline-none bg-gray-200 w-full py-3 px-2"
              name="email"
              placeholder="Enter You Email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="need" className="mb-1 text-slate-500 font-semibold">
              What date do need me?
            </label>
            <input
              min={new Date().toISOString().split('T')[0]}
              type="date"
              className="outline-none bg-gray-200 w-full py-3 px-2"
              name="need"
              placeholder=""
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="mb-1 text-slate-500 font-semibold"
            >
              Your message?
            </label>
            <textarea
              name="message"
              placeholder="Your message."
              id=""
              cols="30"
              rows="10"
              className="outline-none bg-gray-200 w-full py-3 px-2"
            ></textarea>
          </div>

          <input
            className="brand-btn text-white transition-all ease-in-out duration-500 md:px-14 md:text-xl cursor-pointer px-10 font-semibold py-3 rounded-[50px]"
            type="submit"
            value=" Send Message"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactComponents;
