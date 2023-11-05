import React from 'react';
const AccordionSection = () => {

    return (
        <div className="container mx-auto grid md:grid-cols-2 gap-4 py-12 p-4">
            <div>
                <h3 className="brand-color font-semibold">Got Questions?</h3>
                <h1 className="text-5xl font-semibold mt-4">We’ve Got You Covered!</h1>
                <h5 className="font-semibold text-xl mt-2">Chat Now</h5>
                <h6 className='mt-2'>Call or SMS us on +1 424-398-8032</h6>
                <div className='py-2'>
                    <button className='brand-btn btn'>Get The Bundle</button>
                </div>
                <p className="brand-color">Subscriptions start from $6.50</p>
            </div>
            <div>
                <div className="collapse collapse-arrow bg-orange-50">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div className="collapse-title text-xl font-medium">
                        <h2 className="brand-color">How many pairs do I get a month?</h2>

                    </div>
                    <div className="collapse-content">
                        <p>You can choose to get either 1 or 2 pairs of socks a month. The 2 pair deal is only ~$5 more a month.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-orange-50 mt-4">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        <h2 className="brand-color"> What kind of socks will I get?</h2>
                    </div>
                    <div className="collapse-content">
                        <p>All of our socks are crew fitting socks. They will come up to your mid-calf. They are all made from a high quality combed cotton blend.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-orange-50 mt-4">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        <h2 className="brand-color">What if I don’t like the socks?</h2>
                    </div>
                    <div className="collapse-content">
                        <p>We always want our subscribers to LOVE their socks. If you don't for any reason, send us a message and as part of our happiness guarantee, we'll send you a free replacement pair with your next shipment.


                            Only active subscribers can request replacement socks, and you can only do so once every 6 months. If your subscription is canceled or expired, you won't be able to exchange your socks.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccordionSection;