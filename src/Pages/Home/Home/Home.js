import React from 'react';
import Banner from '../Banner/Banner';
import FeatureCars from '../FeatureCars/FeatureCars';
import Reviews from '../Reviews/Reviews';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureCars></FeatureCars>
            <Reviews></Reviews>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;