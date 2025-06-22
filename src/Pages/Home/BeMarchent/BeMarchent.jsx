import React from 'react';
import MarchentBg from '../../../assets/be-a-merchant-bg.png';
import LocationMarchent from '../../../assets/location-merchant.png';

const BeMarchent = () => {
    return (
        <section className="py-10">
            <div className="container mx-auto px-5">
                <div className="max-w-7xl mx-auto py-20 bg-primary rounded-xl bg-no-repeat"
                style={{ backgroundImage: `url(${MarchentBg})`}}>
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 p-10 md:p-20">
                    <div className="content-box w-full lg:w-7/12 text-center lg:text-start">
                        <h2 className="sub-heading text-white mb-5">
                           Merchant and Customer Satisfaction is Our First Priority
                        </h2>
                        <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <div className="btn-container flex gap-5 flex-wrap justify-center lg:justify-start">
                            <button className="btn btn-accent rounded-full text-base md:text-lg font-semibold px-5 md:px-7">
                                Become a Merchant
                            </button>
                            <button className="btn btn-accent btn-outline rounded-full text-base md:text-lg font-semibold px-5 md:px-7">
                                Earn with Profast Courier
                            </button>
                        </div>
                    </div>
                    <div className="img-box w-full lg:w-5/12 flex justify-center lg:justify-end">
                        <img src={LocationMarchent} alt="Marchent Image" className='lg:-ms-20 '/>
                    </div>
                </div>

                </div>
            </div>
        </section>
    );
};

export default BeMarchent;