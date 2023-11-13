import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PostFaq = () => {
  const { axiosSecure } = useAxiosSecure();
  const handlePostFaq = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const postObjectFAQ = {
      type: "FAQ",
      faq: {
        question: title,
        body: description,
      },
    };
    axiosSecure
      .post("/create-layout", postObjectFAQ)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "FAQ Upload successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          setError("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-center my-5 md:text-5xl text-xl">
        Post Frequently asked and question
      </h1>
      <form onSubmit={handlePostFaq}>
        <div className="flex flex-col items-start w-full gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              className="border outline-none py-2 px-2"
              placeholder="Enter Title"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              className="border outline-none py-2 px-2"
              placeholder="Please Enter Description"
              required
            ></textarea>
          </div>
          <button className="brand-bg p-2 px-4">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostFaq;
