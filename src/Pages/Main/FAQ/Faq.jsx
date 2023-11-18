import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Faq = () => {
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  // const items = [
  //   {
  //     header: "What is Lorem Ipsum?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     indexNumber: 1,
  //   },
  //   {
  //     header: "Where does it come from?",
  //     content:
  //       "Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae, accumsan auctor mi..",
  //     indexNumber: 2,
  //   },
  //   {
  //     header: "Why do we use it?",
  //     content:
  //       " Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.Fusce vulputate purus sed tempus feugiat.",
  //     indexNumber: 3,
  //   },
  //   {
  //     header: "What is Lorem Ipsum?",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     indexNumber: 4,
  //   },
  //   {
  //     header: "Where does it come from?",
  //     content:
  //       "Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla vel erat quis sodales. Nam ex enim, eleifend venenatis lectus vitae, accumsan auctor mi..",
  //     indexNumber: 5,
  //   },
  //   {
  //     header: "Why do we use it?",
  //     content:
  //       " Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.Fusce vulputate purus sed tempus feugiat.",
  //     indexNumber: 6,
  //   },
  // ];
  useEffect(() => {
    axiosSecure.get("get-faqs").then((res) => {
      setItems(res?.data?.data);
    });
  }, []);
  console.log(items);
  return (
    <div className="lg:max-w-[1200px] container md:mx-auto mx-5 my-10 md:my-[100px]">
      <div className="text-center">
        <h1 className="md:text-5xl text-xl">Frequently asked and question</h1>
        <p className="mt-4 text-[#FF4500]">Clear Confusion</p>
      </div>
      <Accordion className="grid grid-cols-1 gap-5  my-[50px]">
        {items?.map((item, i) => {
          return (
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
              <span className="md:text-[18px] text-[12px]"> {item?.body}</span>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Faq;
