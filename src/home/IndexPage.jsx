import React from 'react';
import Navbar from './HomeComponents/Nav';
import ImagesContain from './imagesContain';
import { AboutUs, Services } from './HomeComponents/AboutUs';
import ContactForm from './HomeComponents/ContactUs';
import Newsletter from './HomeComponents/NewsLetter';
import Footer from './Footer';
import Pricing from './HomeComponents/Pricing';
const IndexPage = () => {
    return (
        <>
            <br />
            <div className="hms-imgs-slider">
                <ImagesContain />
            </div>
            <div className="abousUs">
                <AboutUs />
            </div>
            <div className="servicesHMS">
                <Services />
                <div className="pricingRates">
                    <Pricing />
                </div>
            <div className="contactF">
                <ContactForm />
            </div>
            </div>
            <div className="newsLetter">
                <Newsletter />
            </div>
        </>
    );
}

export default IndexPage;
