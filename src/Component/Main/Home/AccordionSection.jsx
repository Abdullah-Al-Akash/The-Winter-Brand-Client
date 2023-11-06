import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DrawerComponent from "../../../Sheard/Drawer/DrawerComponent";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { AiOutlineRight } from "react-icons/ai";

const AccordionSection = () => {
  const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
  const [drop, setDrop] = useState(false);
  const items = [
    {
      id: 1,
      heading: "How many pairs do I get a month?",
      content:
        "You can choose to get either 1 or 2 pairs of socks a month. The 2 pair deal is only ~$5 more a month.",
    },
    {
      id: 2,
      heading: "What kind of socks will I get?",
      content:
        " All of our socks are crew fitting socks. They will come up to your  mid-calf. They are all made from a high quality combed cotton blend.",
    },
    {
      id: 3,
      heading: "What if I don’t like the socks?",
      content:
        "We always want our subscribers to LOVE their socks. If you don't for any reason, send us a message and as part of our happiness guarantee, we'll send you a free replacement pair with your next shipment. Only active subscribers can request replacement socks, and you can only do so once every 6 months. If your subscription is canceled or expired, you won't be able to exchange your socks.",
    },
  ];
  const handleDrop = (_id, isOpen) => {};
  console.log(drop);
  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-4 py-12 p-4">
      <div>
        <h3 className="brand-color font-semibold">Got Questions?</h3>
        <h1 className="text-5xl font-semibold mt-4">We’ve Got You Covered!</h1>
        <h5 className="font-semibold text-xl mt-2">Chat Now</h5>
        <h6 className="mt-2">Call or SMS us on +1 424-398-8032</h6>
        <div className="py-2">
          <button onClick={toggleDrawer} className="brand-btn btn">
            Get The Bundle
          </button>
        </div>
        <p className="brand-color">Subscriptions start from $6.50</p>
      </div>
      <div>
        <Accordion allowZeroExpanded>
          {items.map((item) => (
            <AccordionItem key={item.id} className="bg-orange-50 px-2">
              <AccordionItemHeading>
                <AccordionItemButton
                  className="brand-color py-2 flex items-center"
                  onClick={() => setDrop(!drop)}
                >
                  <span className="text-2xl">{item.heading}</span>
                  <AiOutlineRight
                    className={`transition-transform transform rotate-90 ms-2 font-semibold`}
                  />
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{item.content}</AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <DrawerComponent></DrawerComponent>
    </div>
  );
};

export default AccordionSection;
