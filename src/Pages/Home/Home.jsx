import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Services';
import HowItWorks from './HowItWorks/HowItWorks';
import BrandMarquee from './BrandMarquee/BrandMarquee';
import KeyBenefits from './KeyBenefits/KeyBenefits';
import BeMarchent from './BeMarchent/BeMarchent';
import FAQ from './FAQ/FAQ';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <>
            <Banner />
            <HowItWorks />
            <Services></Services>
            <BrandMarquee></BrandMarquee>
            <KeyBenefits></KeyBenefits>
            <BeMarchent></BeMarchent>
            <Testimonial></Testimonial>
            <FAQ></FAQ>
        </>
    );
};

export default Home;