import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { BsTrash } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Sheard/Loading/Loading";
import Swal from "sweetalert2";

const ViewFaq = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { axiosSecure } = useAxiosSecure();
  const [control, setControl] = useState(false);
  // const items = [
  //   {
  //     question: "What is Lorem Ipsum?",
  //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     index: 1,
  //   },
  //   {
  //     question: "Where does it come from?",
  //     body: "Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae, accumsan auctor mi..",
  //     index: 2,
  //   },
  //   {
  //     question: "Why do we use it?",
  //     body: " Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.Fusce vulputate purus sed tempus feugiat.",
  //     index: 3,
  //   },
  //   {
  //     question: "What is Lorem Ipsum?",
  //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     index: 4,
  //   },
  //   {
  //     question: "Where does it come from?",
  //     body: "Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae, accumsan auctor mi..",
  //     index: 5,
  //   },
  //   {
  //     question: "Why do we use it?",
  //     body: " Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.Fusce vulputate purus sed tempus feugiat.",
  //     index: 6,
  //   },
  // ];
  useEffect(() => {
    axiosSecure
      .get("/get-faqs")
      .then((res) => {
        setItems(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [control]);
  const handleDeleteFAQ = (id) => {
    axiosSecure
      .delete(`delete-layout?type=FAQ&id=${id}`)
      .then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            title: "Delete!",
            text: "Delete FAQ Successfully.",
            icon: "success",
          });
          setControl(!control);
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-center my-5 md:text-5xl text-xl">All FAQ</h2>
      <Accordion className="grid grid-cols-1 gap-5  my-[50px]">
        {items?.map((item, i) => {
          return (
            <div
              key={i}
              className={`${i + 1 == 1
                  ? " border-green-400 border-b"
                  : i + 1 == 2
                    ? " border-blue-400 border-b"
                    : i + 1 == 3
                      ? " border-red-400 border-b"
                      : i + 1 == 4
                        ? " border-yellow-400 border-b"
                        : (i + 1) % 4 === 1
                          ? " border-amber-800 border-b"
                          : (i + 1) % 4 === 2
                            ? " border-blue-800 border-b"
                            : (i + 1) % 4 === 3
                              ? "border-green-400 border-b"
                              : "border-red-400 border-b"
                }  flex justify-between items-center`}
            >
              <AccordionItem
                className={`${i + 1 == 1
                    ? "border-l-[10px] px-2 border-green-400"
                    : i + 1 == 2
                      ? "border-l-[10px] px-2 border-blue-400"
                      : i + 1 == 3
                        ? "border-l-[10px] px-2 border-red-400"
                        : i + 1 == 4
                          ? "border-l-[10px] px-2 border-yellow-400"
                          : (i + 1) % 4 === 1
                            ? "border-l-[10px] px-2 border-amber-800"
                            : (i + 1) % 4 === 2
                              ? "border-l-[10px] px-2 border-blue-800"
                              : (i + 1) % 4 === 3
                                ? "border-green-400"
                                : "border-red-400"
                  } md:text-2xl`}
                header={item?.question}
              >
                <span className="md:text-[18px] text-[12px]">
                  {" "}
                  {item?.body}
                </span>
              </AccordionItem>
              <button onClick={() => handleDeleteFAQ(item?._id)}>
                <BsTrash></BsTrash>
              </button>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ViewFaq;
