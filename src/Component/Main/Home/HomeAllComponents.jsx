import React from 'react';
import Banner from './Banner';
import OfferSection from './OfferSection';
import MakeWinterPerfect from './MakeWinterPerfect';
import GetReady from './GetReady';
import Accordion from './AccordionSection';
import ItemSlider from './ItemSlider';
import FollowUs from './FollowUs';
import HowItWork from './HowItWork';

const HomeAllComponents = () => {
    return (
        <div>
            <Banner></Banner>
            <OfferSection></OfferSection>
            <HowItWork></HowItWork>
            <MakeWinterPerfect></MakeWinterPerfect>
            <ItemSlider></ItemSlider>
            <OfferSection></OfferSection>
            <GetReady></GetReady>
            <Accordion></Accordion>
            <FollowUs></FollowUs>
        </div>
    );
};

export default HomeAllComponents;