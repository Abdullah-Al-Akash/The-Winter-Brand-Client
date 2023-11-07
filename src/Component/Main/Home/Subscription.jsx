import "./Subscription.css"
import emoji1 from "./../../../assets/emoji1.webp"
import emoji2 from "./../../../assets/emoji2.png"
import size1 from "./../../../assets/size1.png"
import size2 from "./../../../assets/size2.png"
import size3 from "./../../../assets/size3.png"
import size4 from "./../../../assets/size4.png"
import size5 from "./../../../assets/size5.png"
import { useState } from "react";
import { Link } from "react-router-dom"

const sizes = [
    {
        name: "XL",
        body: "Suggested for Giants US 12-14",
        image: size1
    },
    {
        name: "Large",
        body: "Suggested for Men US 8-11",
        image: size2
    },
    {
        name: "Medium",
        body: "Suggested for Women US 5-8",
        image: size3
    },
    {
        name: "Kid's Large",
        body: "Ages 7 - 10 (US 1 -5)",
        image: size4
    },
    {
        name: "Kid's Medium",
        body: "Ages 3 - 6 (US 8 - 13)",
        image: size5
    },
]


const Subscription = () => {
    const [sub, setSub] = useState("me")
    const [plan, setPlan] = useState("plan1")
    const [sizeName, setSizeName] = useState("XL")
    const [quantity, setQuantity] = useState("1")
    const [setected, setSetected] = useState("S1")
    return (
        <>
            <div className="mt-5 mb-3">

                <h3 className="text-4xl font-bold">Customize Your Subscription</h3>
                {/* Customize btns  */}
                <div className="w-full flex items-center gap-3 my-3 justify-between">
                    {/* bg-[#ff4500] */}
                    <button onClick={() => setSub("me")} className={`${sub === "me" ? "bg-[#ff4500] text-white" : ""} duration-200 flex items-center gap-2 p-[16px] w-full rounded-lg hover:border-[#ff4500]  font-bold border`}><img className="h-[24px] w-[24px] md:w-[34px] md:h-[34px]" src={emoji1} alt="" /><span className="text-[14px] md:text-[20px]">This is for me</span></button>
                    <button onClick={() => setSub("gift")} className={`${sub === "gift" ? "bg-[#ff4500] text-white" : ""} duration-200 flex items-center gap-2 p-[16px] w-full rounded-lg hover:border-[#ff4500]  font-bold border`}><img className="h-[24px] w-[24px] md:w-[34px] md:h-[34px]" src={emoji1} alt="" /><span className="text-[14px] md:text-[20px]">This is for me</span></button>
                </div>
                {
                    sub === "gift" && (
                        <form>
                            <h2 className="text-[24px] font-bold">Gift Option</h2>
                            <p>Don't worry, we won't send them any emails until the date you tell us to. We wouldn't want to spoil the surprise!</p>
                            <div className="my-3">
                                <label className="block text-[14px] font-bold my-2" htmlFor="">Gift Recipient Email Address</label>
                                <input className="px-4 py-2 rounded-lg outline-none border w-full" type="text" name="" placeholder="Gift Recipient Email Address" />
                            </div>
                            <div className="my-3">
                                <label className="block text-[14px] font-bold my-2" htmlFor="">Date to Email Gift Message</label>
                                <input className="px-4 py-2 rounded-lg outline-none border w-full" type="date" name="" placeholder="Date to Email Gift Message" />
                            </div>
                            <div className="my-3">
                                <label className="block text-[14px] font-bold mt-2" htmlFor="">Gift Message</label>
                                <span className="text-slate-400 text-[12px]">Required. Remember to let them know who it's from</span>
                                <input className="px-4 py-2 rounded-lg outline-none border w-full" type="text" name="" placeholder="you are toe-tally awesome. Enjoy the socks!" />
                            </div>
                            <div className="my-3">
                                <label className="block text-[14px] font-bold my-2" htmlFor="">Shipping Date</label>
                                <input className="px-4 py-2 rounded-lg outline-none border w-full" type="date" name="" placeholder="Shipping Date" />
                            </div>
                        </form>
                    )
                }
                {/* select duration  */}
                <h3 className="text-[16px] font-bold md:text-[24px] my-4">Select Duration</h3>
                <div className="w-full">
                    <button onClick={() => setPlan("plan1")} className={`${plan === "plan1" ? "bg-[#ff4500] text-white" : ""} duration-200 my-2 border p-5 rounded-lg hover:border-[#ff4500] w-full flex  items-center justify-between gap-3`}>
                        <p className="flex gap-3 items-center">
                            <img className="w-[35px] h-[35px]" src={emoji1} alt="" />
                            <span className="flex flex-col items-start">
                                <span className="my-1 text-[14px] font-bold md:text-[18px]">This time</span>
                                <span className="my-1 text-[14px]">$6.50 USD 1st month then $12.99 USD</span>
                            </span>
                        </p>
                        <p className="flex flex-col items-start -mb-3">
                            <span className="my-1 text-[18px]">USD</span>
                            <span className="my-1 text-[18px]">8</span>
                            <span className="my-1 line-through text-[14px]">USD 15</span>
                        </p>
                    </button>
                    <button onClick={() => setPlan("plan2")} className={`${plan === "plan2" ? "bg-[#ff4500] text-white" : ""} duration-200 my-2 border p-5 rounded-lg hover:border-[#ff4500] w-full flex items-center justify-between gap-3`}>
                        <p className="flex gap-3 items-center">
                            <img className="w-[35px] h-[35px]" src={emoji2} alt="" />
                            <span className="flex flex-col items-start">
                                <span className="my-1 text-[14px] font-bold md:text-[18px]">Anuall plan</span>
                                <span className="my-1 text-[14px]">$6.50 USD 1st month then $12.99 USD</span>
                            </span>
                        </p>
                        <p className="flex flex-col items-start -mb-3">
                            <span className="my-1 text-[18px]">USD</span>
                            <span className="my-1 text-[18px]">50</span>
                            <span className="my-1 line-through text-[14px]">USD 15</span>
                        </p>
                    </button>
                </div>

                {/* sizes  */}
                <h3 className="text-[16px] font-bold md:text-[24px] mt-10 mb-4">Select Size</h3>
                <div>
                    {sizes.map((size, i) => {
                        return (
                            <button onClick={() => setSizeName(size.name)} className={`${sizeName === size.name ? "bg-[#ff4500] text-white" : ""} duration-200 my-2 border p-5 rounded-lg hover:border-[#ff4500] w-full flex items-end  gap-3`} key={i}>
                                <img src={size.image} alt="" />
                                <div className="flex flex-col items-start gap-2">
                                    <p className="text-[18px]">{size.name}</p>
                                    <p className="text-[14px]">{size.body}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
                {/* Select Quantity */}
                <h3 className="text-[16px] font-bold md:text-[24px] my-4">Select Quantity</h3>
                <div className="w-full">
                    <button onClick={() => setQuantity("1")} className={`${quantity === "1" ? "bg-[#ff4500] text-white" : ""} duration-200 my-2 border p-5 rounded-lg hover:border-[#ff4500] w-full flex items-end justify-between gap-3`}>
                        <p className="flex gap-3 items-center">
                            <img className="w-[35px] h-[35px]" src={emoji1} alt="" />
                            <span className="flex flex-col items-start">
                                <span className="my-1 text-[14px] font-bold md:text-[18px]">1 Pair a Month</span>
                                <span className="my-1 text-[14px]">Tk 800.00 1st month then Tk 1,500.00</span>
                            </span>
                        </p>
                        <p className="flex flex-col items-start -mb-3">
                            <span className="my-1 text-[18px]">USD</span>
                            <span className="my-1 text-[18px]">8</span>
                            <span className="my-1 line-through text-[14px]">USD 15</span>
                        </p>
                    </button>
                    <button onClick={() => setQuantity("2")} className={`${quantity === "2" ? "bg-[#ff4500] text-white" : ""} duration-200 my-2 border p-5 rounded-lg hover:border-[#ff4500] w-full flex items-end justify-between gap-3`}>
                        <p className="flex gap-3 items-center">
                            <img className="w-[35px] h-[35px]" src={emoji2} alt="" />
                            <span className="flex flex-col items-start">
                                <span className="my-1 text-[14px] font-bold md:text-[18px]">2 Pairs a Month</span>
                                <span className="my-1 text-[14px]">k 1,200.00 1st month then Tk 2,300.00</span>
                            </span>
                        </p>
                        <p className="flex flex-col items-start -mb-3">
                            <span className="my-1 text-[18px]">USD</span>
                            <span className="my-1 text-[18px]">50</span>
                            <span className="my-1 line-through text-[14px]">USD 15</span>
                        </p>
                    </button>
                </div>
                {/* Select Sock Craziness */}
                <h3 className="text-[16px] font-bold md:text-[24px] my-4">Select Sock Craziness</h3>
                <div className="w-full flex gap-3">
                    <div onClick={() => quantity === "1" ? setSetected("S1") : ""} className={`${setected === "S1" ? "bg-[#ff4500] text-white" : quantity === "2" && "bg-[#ff4500] text-white"} duration-200 my-2 border  rounded-lg hover:border-[#ff4500] w-full flex flex-col gap-3`}>

                        <img className="w-full rounded-t-lg" src="https://sayitwithasock.com/cdn/shop/files/Graphic_Socks_Combo_250x.jpg?v=1643071446" alt="" />


                        <div className="flex flex-col items-start p-2">
                            <p className="my-1 text-[18px] font-bold">Wild and Colorful</p>
                            <p className="my-1 text-[14px]">Bright colors</p>

                        </div>
                    </div>
                    <div onClick={() => quantity === "1" ? setSetected("S2") : ""} className={`${setected === "S2" ? "bg-[#ff4500] text-white" : quantity === "2" && "bg-[#ff4500] text-white"} duration-200 my-2 border rounded-lg hover:border-[#ff4500] w-full flex flex-col gap-3`}>

                        <img className="w-full rounded-t-lg" src="https://sayitwithasock.com/cdn/shop/files/Graphic_Socks_Combo_250x.jpg?v=1643071446" alt="" />


                        <div className="flex flex-col items-start p-2">
                            <p className="my-1 text-[18px] font-bold">Wild and Colorful</p>
                            <p className="my-1 text-[14px]">Bright colors</p>

                        </div>
                    </div>
                </div>
                <Link className=" w-full my-4 py-3 block bg-[#ff7610] rounded-full font-bold text-white text-[18px] text-center" to="/checkout"><button >Continue to checkout</button></Link>
            </div >


        </>

    );
};

export default Subscription;