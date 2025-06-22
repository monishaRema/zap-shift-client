import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImg1 from "../../../assets/banner/banner1.png";
import BannerImg2 from "../../../assets/banner/banner2.png";
import BannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <section className="">
      <div className="container mx-auto px-5">
        <div className="rounded-4xl overflow-hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}

        >
          <div>
            <img src={BannerImg1} />
          </div>
          <div>
            <img src={BannerImg2} />
          </div>
          <div>
            <img src={BannerImg3} />
          </div>
        </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Banner;
