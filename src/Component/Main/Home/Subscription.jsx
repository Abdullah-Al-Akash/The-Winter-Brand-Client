import "./Subscription.css";
import emoji1 from "./../../../assets/emoji1.webp";
import emoji2 from "./../../../assets/emoji2.png";
import size1 from "./../../../assets/size1.png";
import size2 from "./../../../assets/size2.png";
import size3 from "./../../../assets/size3.png";
import size4 from "./../../../assets/size4.png";
import size5 from "./../../../assets/size5.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthContext,
  cookies,
  cookiesOptions,
} from "../../../AuthProvider/AuthProvider";
import { useCheckoutData } from "../../../context/CheckoutProvider";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const sizes = [
  {
    name: "Adult",
    body: "Ages 13+",
    image: size4,
  },
  {
    name: "Kid's ",
    body: "Ages 3 - 6 (US 8 - 13)",
    image: size5,
  },
];

const Subscription = () => {
  const navigate = useNavigate();
  const { toggleDrawer } = useContext(AuthContext);
  const { setControl, control } = useCheckoutData();
  const [sub, setSub] = useState("me");
  const [gender, setGender] = useState("male");
  const [plan, setPlan] = useState("plan1");
  const [sizeName, setSizeName] = useState("Adult");
  const [quantity, setQuantity] = useState("1");
  const [selected, setSelected] = useState("S1");
  const [giftRecipientEmail, setGiftRecipientEmail] = useState(null);
  const [giftMessageDate, setGiftMessageDate] = useState(null);
  const [giftMessage, setGiftMessage] = useState(null);
  const [shippingDate, setShippingDate] = useState(null);
  const [errorMassage, setErrorMassage] = useState("");
  const handleSubmit = () => {
    const data =
      sub === "me"
        ? {
            type: sub === "me" && "personal",
            gender: gender,
            size: sizeName,
            duration: plan === "plan1" ? "payment" : "subscription",
            quantity: quantity === "1" ? "bundle_one" : "bundle_two",
            price: quantity === "1" ? 49 : 90,
            selected:
              quantity === "1"
                ? selected === "S1"
                  ? ["Neutral Color"]
                  : ["Wild and Colorful"]
                : ["Neutral Color", "Wild and Colorful"],
          }
        : {
            type: "gift",
            gender: gender,
            size: sizeName,
            gift_recipient_email: giftRecipientEmail,
            gift_message_date: giftMessageDate,
            gift_message: giftMessage,
            shipping_date: shippingDate,
            duration: plan === "plan1" ? "payment" : "subscription",
            quantity: quantity === "1" ? "bundle_one" : "bundle_two",
            price: quantity === "1" ? 49 : 90,
            selected:
              quantity === "1"
                ? selected === "S1"
                  ? ["Neutral Color"]
                  : ["Wild and Colorful"]
                : ["Neutral Color", "Wild and Colorful"],
          };

    cookies.set("data", data, cookiesOptions);

    setControl(!control);

    toggleDrawer();
    return navigate("/checkout");
  };
  const handleEmailValidation = (value) => {
    const emailHandle = value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailHandle)) {
      setErrorMassage("Email are not valid");
      return;
    } else {
      setErrorMassage("");
    }
  };

  return (
    <>
      <div className="mt-5 mb-3">
        <h3 className="md:text-4xl text-2xl font-bold my-[30px]">
          Customize Your Subscription
        </h3>
        {/* Customize btns  */}
        <div className="w-full flex items-center gap-3 my-3 justify-between">
          {/* bg-black */}
          <button
            onClick={() => setSub("me")}
            className={`${
              sub === "me" ? "bg-black text-white" : ""
            } duration-200 flex items-center gap-2 p-[16px] w-full rounded-lg hover:border-black  font-bold border`}
          >
            <img
              className="h-[24px] w-[24px] md:w-[34px] md:h-[34px]"
              src={emoji1}
              alt=""
            />
            <span className="text-[14px] md:text-[20px]">This is for me</span>
          </button>
          <button
            onClick={() => setSub("gift")}
            className={`${
              sub === "gift" ? "bg-black text-white" : ""
            } duration-200 flex items-center gap-2 p-[16px] w-full rounded-lg hover:border-black  font-bold border`}
          >
            <img
              className="h-[24px] w-[24px] md:w-[34px] md:h-[34px]"
              src={emoji1}
              alt=""
            />
            <span className="text-[14px] md:text-[20px]">This is for Gift</span>
          </button>
        </div>
        {sub === "gift" && (
          <form>
            <h2 className="text-sm md:text-[24px] font-bold my-4">
              Gift Option
            </h2>
            <p>
              Don't worry, we won't send them any emails until the date you tell
              us to. We wouldn't want to spoil the surprise!
            </p>
            <div className="my-3">
              <label className="block text-[14px] font-bold my-2" htmlFor="">
                Gift Recipient Email Address{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                className="px-4 py-2 rounded-lg outline-none border w-full"
                type="email"
                name=""
                value={giftRecipientEmail}
                onChange={(e) => {
                  setGiftRecipientEmail(e.target.value),
                    handleEmailValidation(e.target.value);
                }}
                placeholder="Gift Recipient Email Address"
                required
              />
              <p className="text-red-500 mt-1">{errorMassage}</p>
            </div>
            <div className="my-3">
              <label className="block text-[14px] font-bold my-2" htmlFor="">
                Date to Email Gift Message{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                className="px-4 py-2 rounded-lg outline-none border w-full"
                type="date"
                name=""
                value={giftMessageDate}
                onChange={(e) => setGiftMessageDate(e.target.value)}
                placeholder="Date to Email Gift Message"
                required
              />
            </div>
            <div className="my-3">
              <label className="block text-[14px] font-bold mt-2" htmlFor="">
                Gift Message <span className="text-red-600">*</span>
              </label>
              <span className="text-slate-400 text-[12px]">
                Required. Remember to let them know who it's from
              </span>
              <input
                className="px-4 py-2 rounded-lg outline-none border w-full"
                type="text"
                name=""
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="you are toe-tally awesome. Enjoy the socks!"
                required
              />
            </div>
            <div className="my-3">
              <label className="block text-[14px] font-bold my-2" htmlFor="">
                Shipping Date <span className="text-red-600">*</span>
              </label>
              <input
                className="px-4 py-2 rounded-lg outline-none border w-full"
                type="date"
                name=""
                value={shippingDate}
                onChange={(e) => setShippingDate(e.target.value)}
                placeholder="Shipping Date"
                required
              />
            </div>
          </form>
        )}
        {/* Select Gender */}
        <h3 className="text-[16px] font-bold md:text-[24px] my-4">
          Select Gender
        </h3>

        <div className="w-full">
          <button
            onClick={() => setGender("male")}
            className={`${
              gender === "male" ? "bg-black text-white" : ""
            } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex  items-center justify-between gap-3`}
          >
            <p className="flex gap-3 items-center">
              <img className="w-[35px] h-[35px]" src={emoji1} alt="" />
              <span className="flex flex-col items-start">
                <span className="my-1 text-[14px] font-bold md:text-[18px]">
                  Male
                </span>
              </span>
            </p>
            <p className="flex flex-col items-start -mb-3"></p>
          </button>
          <button
            onClick={() => setGender("female")}
            className={`${
              gender === "female" ? "bg-black text-white" : ""
            } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex items-center justify-between gap-3`}
          >
            <p className="flex gap-3 items-center">
              <img className="w-[35px] h-[35px]" src={emoji2} alt="" />
              <span className="flex flex-col items-start">
                <span className="my-1 text-[14px] font-bold md:text-[18px]">
                  Female
                </span>
              </span>
            </p>
            <p className="flex flex-col items-start -mb-3"></p>
          </button>
        </div>
        {/* select duration  */}

        {/* sizes  */}
        <h3 className="text-[16px] font-bold md:text-[24px] mt-10 mb-4">
          Select Size
        </h3>
        <div>
          {sizes?.map((size, i) => {
            return (
              <button
                onClick={() => setSizeName(size.name)}
                className={`${
                  sizeName === size.name ? "bg-black text-white" : ""
                } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex items-end  gap-3`}
                key={i}
              >
                <img src={size.image} alt="" />
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[18px]">{size.name}</p>
                  <p className="text-[14px]">{size.body}</p>
                </div>
              </button>
            );
          })}
        </div>

        <h3 className="text-[16px] font-bold md:text-[24px] my-4">
          Select Duration
        </h3>

        <div className="w-full">
          <button
            onClick={() => setPlan("plan1")}
            className={`${
              plan === "plan1" ? "bg-black text-white" : ""
            } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex  items-center justify-between gap-3`}
          >
            <p className="flex gap-3 items-center">
              <img className="w-[35px] h-[35px]" src={emoji1} alt="" />
              <span className="flex flex-col items-start">
                <span className="my-1 text-[14px] font-bold md:text-[18px]">
                  One Time Bundle
                </span>
              </span>
            </p>
            <p className="flex flex-col items-start -mb-3"></p>
          </button>
          <button
            onClick={() => setPlan("plan2")}
            className={`${
              plan === "plan2" ? "bg-black text-white" : ""
            } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex items-center justify-between gap-3`}
          >
            <p className="flex gap-3 items-center">
              <img className="w-[35px] h-[35px]" src={emoji2} alt="" />
              <span className="flex flex-col items-start">
                <span className="my-1 text-[14px] font-bold md:text-[18px]">
                  Annual Bundle
                </span>
              </span>
            </p>
            <p className="flex flex-col items-start -mb-3"></p>
          </button>
        </div>
        {/* Select Quantity */}
        <h3 className="text-[16px] font-bold md:text-[24px] my-4">
          Select Quantity
        </h3>
        <div className="w-full">
          <button
            onClick={() => setQuantity("1")}
            className={`${
              quantity === "1" ? "bg-black text-white" : ""
            } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex items-end justify-between gap-3`}
          >
            <p className="flex gap-3 items-center">
              <img className="w-[35px] h-[35px]" src={emoji1} alt="" />
              <span className="flex flex-col items-start">
                <span className="my-1 text-[14px] font-bold md:text-[18px]">
                  1 Bundle
                </span>
                <span className="my-1 text-[14px]">Upto save 30%</span>
              </span>
            </p>
            <p className="flex flex-col items-start -mb-3">
              <p className="flex items-center pb-4">
                <span className="my-1 text-[18px]">$ </span>
                <span className="my-1 text-[18px]"> 49</span>
                {/* <span className="my-1 line-through text-[14px]">USD 15</span> */}
              </p>
              {/* <span className="my-1 line-through text-[14px]">USD 15</span> */}
            </p>
          </button>
          <button
            onClick={() => setQuantity("2")}
            className={`${
              quantity === "2" ? "bg-black text-white" : ""
            } duration-200 my-2 border p-5 rounded-lg hover:border-black w-full flex items-end justify-between gap-3`}
          >
            <p className="flex gap-3 items-center">
              <img className="w-[35px] h-[35px]" src={emoji2} alt="" />
              <span className="flex flex-col items-start">
                <span className="my-1 text-[14px] font-bold md:text-[18px]">
                  2 Bundle
                </span>
                <span className="my-1 text-[14px]">Upto save 70%</span>
              </span>
            </p>
            <p className="flex items-center pb-4">
              <span className="my-1 text-[18px]">$ </span>
              <span className="my-1 text-[18px]"> 90</span>
              {/* <span className="my-1 line-through text-[14px]">USD 15</span> */}
            </p>
          </button>
        </div>
        {/* Select Sock Craziness */}
        <h3 className="text-[16px] font-bold md:text-[24px] my-4">
          Select Beanie Craziness
        </h3>
        <div className="w-full flex gap-3">
          <div
            onClick={() => (quantity === "1" ? setSelected("S1") : "")}
            className={`${
              selected === "S1"
                ? "bg-black text-white"
                : quantity === "2" && "bg-black text-white"
            } duration-200 my-2 border  rounded-lg hover:border-black w-full flex flex-col gap-3`}
          >
            <img
              className="w-full rounded-t-lg bg-white"
              src="https://i.ibb.co/hcLwg9W/399755345-1372243073710860-2973877592655521287-n.jpg"
              alt=""
            />

            <div className="flex flex-col items-start p-2">
              <p className="my-1 text-[18px] font-bold">Neutral Color</p>
            </div>
          </div>
          <div
            onClick={() => (quantity === "1" ? setSelected("S2") : "")}
            className={`${
              selected === "S2"
                ? "bg-black text-white"
                : quantity === "2" && "bg-black text-white"
            } duration-200 my-2 border rounded-lg hover:border-black w-full flex flex-col gap-3`}
          >
            <img
              className="w-full rounded-t-lg"
              src="https://i.ibb.co/1zcm6LW/385533376-1046381806804730-7955442742744901698-n.jpg"
              alt=""
            />

            <div className="flex flex-col items-start p-2">
              <p className="my-1 text-[18px] font-bold">Wild and Colorful</p>
            </div>
          </div>
        </div>
        {/* <Link
          onClick={toggleDrawer}
          className=" "
          to="/"
        > */}

        {sub === "gift" && (
          <p className="text-red-700">
            <span className="font-bold">Note:</span> Gift Option is required
          </p>
        )}
        {sub === "me" && (
          <button
            className={`w-full my-4 py-3 block brand-bg rounded-full font-bold text-white text-[18px] text-center`}
            onClick={handleSubmit}
          >
            Continue to checkout
          </button>
        )}
        {sub === "gift" && (
          <button
            disabled={
              (sub === "gift" && giftRecipientEmail === null) ||
              giftMessageDate === null ||
              giftMessage === null ||
              shippingDate === null
            }
            className={`${
              (sub === "gift" && giftRecipientEmail === null) ||
              giftMessageDate === null ||
              giftMessage === null ||
              shippingDate === null
                ? "cursor-not-allowed bg-opacity-50"
                : "cursor-pointer"
            } w-full my-4 py-3 block brand-bg rounded-full font-bold text-white text-[18px] text-center`}
            onClick={handleSubmit}
          >
            Continue to checkout
          </button>
        )}
        {/* </Link> */}
      </div>
    </>
  );
};

export default Subscription;
