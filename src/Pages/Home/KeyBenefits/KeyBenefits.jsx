import React from "react";
import { BsBox } from "react-icons/bs";
import BenifitsImage1 from "../../../assets/benifits/live-parcel.png";
import BenifitsImage2 from "../../../assets/benifits/safe-delivery.png";
import BenifitsImage3 from "../../../assets/benifits/support.png";

const data = [
  {
    heading: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    imgUrl: BenifitsImage1,
  },
  {
    heading: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    imgUrl: BenifitsImage2,
  },
  {
    heading: "Fast & Reliable Service",
    desc: "Count on us for speedy and dependable delivery every time. We value your time and aim to deliver your parcels promptly, with excellent customer service support.",
    imgUrl: BenifitsImage3,
  },
];

export default function KeyBenefits() {
  return (
    <section className="">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto py-20 border-b border-t border-dashed border-primary/30">
          <div className="flex flex-col gap-10">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col md:flex-row items-center gap-10 bg-white rounded-xl overflow-hidden p-8 md:p-10"
              >
                <div className="min-w-[300px] flex items-center justify-center">
                  {item.imgUrl ? (
                    <img
                      src={item.imgUrl}
                      alt={item.heading}
                      className="max-w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full p-4">
                      <BsBox size={60} className="text-accent" />
                    </div>
                  )}
                </div>

                <div className="divider divider-vertical md:divider-horizontal ">
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
                    {item.heading}
                  </h2>
                  <p className="text-base-content text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
