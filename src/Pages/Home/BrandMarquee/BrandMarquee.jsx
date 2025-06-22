import React from "react";
import Marquee from "react-fast-marquee";

import casio from "../../../assets/brands/casio.png";
import amazon from "../../../assets/brands/amazon.png";
import moonstar from "../../../assets/brands/moonstar.png";
import starplus from "../../../assets/brands/start.png";
import startpeople from "../../../assets/brands/start-people 1.png";
import randstad from "../../../assets/brands/randstad.png";

const brands = [
  { src: casio, alt: "CASIO" },
  { src: amazon, alt: "Amazon" },
  { src: moonstar, alt: "Moonstar" },
  { src: starplus, alt: "Star Plus" },
  { src: startpeople, alt: "Start People" },
  { src: randstad, alt: "Randstad" },
];

const BrandMarquee = () => {
  return (
    <section className="py-25">
        <div className="container mx-auto px-5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="sub-heading text-primary mb-12">
          We've helped thousands of sales teams
        </h2>

        <Marquee direction="left" speed={50} gradient={false}>
          {brands.map((brand, idx) => (
            <div key={idx} className="mx-14 flex items-center justify-center">
              <img
                src={brand.src}
                alt={brand.alt}
                className="h-7 w-auto transition duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
