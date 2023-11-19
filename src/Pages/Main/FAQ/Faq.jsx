import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HelmetSeo from "../../../Component/shared/Helmet";

const Faq = () => {
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosSecure.get("/get-faqs").then((res) => {
      setItems(res?.data?.data);
    });
  }, []);
  console.log(items);
  return (
    <div className="lg:max-w-[1200px] container md:mx-auto mx-5 my-10 md:my-[100px]">
      <HelmetSeo
        title="Faqs"
        canonical={"faq"}
        description="Clear Confusion Frequently asked and question"
      />
      <div className="text-center">
        <h1 className="md:text-5xl text-xl">Frequently asked and question</h1>
        <p className="mt-4 text-[#FF4500]">Clear Confusion</p>
      </div>
      <Accordion className="grid grid-cols-1 gap-5  my-[50px]">
        {items?.map((item, i) => {
          return (
            <AccordionItem key={i}
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
