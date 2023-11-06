import React from 'react';
import Banner from './Banner';
import OfferSection from './OfferSection';
import HowWork from './HowWork';
import GetReady from './GetReady';
import Accordion from './AccordionSection';
import ItemSlider from './ItemSlider';
import FollowUs from './FollowUs';

const HomeAllComponents = () => {
    return (
        <div>
            <Banner></Banner>
            <OfferSection></OfferSection>
            <HowWork></HowWork>
            <ItemSlider></ItemSlider>
            <OfferSection></OfferSection>
            <GetReady></GetReady>
            <Accordion></Accordion>
            <FollowUs></FollowUs>
        </div>
    );
};

export default HomeAllComponents;