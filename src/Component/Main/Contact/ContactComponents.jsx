import React from "react";

const ContactComponents = () => {
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
      <div className="contactForm-Shadow">
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
              type="text"
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
          <button className="bg-[#ff4500] text-white transition-all ease-in-out duration-500 hover:text-[#ff4500] hover:bg-black md:px-14 md:text-xl px-10 font-semibold py-3 rounded-[50px]">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactComponents;
