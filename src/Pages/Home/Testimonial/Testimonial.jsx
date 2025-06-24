import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialImage from "../../../assets/customer-top.png";


const testimonials = [
  {
    name: "Ayesha Khan",
    title: "E-Commerce Manager",
    review:
      "Zap Shift Parcel is fast, affordable, and incredibly reliable. I send packages weekly and never had an issue.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Mohammed Al-Farsi",
    title: "Freelancer",
    review:
      "I love their live tracking! Knowing where my parcel is gives me peace of mind. Great customer support too.",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Fatima Noor",
    title: "Business Owner",
    review:
      "They handled my international parcels with care and speed. Zap Shift is now my go-to logistics partner.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-base-100 text-black border rounded-full p-2 absolute -left-8 top-1/2 transform -translate-y-1/2 z-10"
  >
    <FiArrowLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-400 text-white rounded-full p-2 absolute -right-8 top-1/2 transform -translate-y-1/2 z-10"
  >
    <FiArrowRight />
  </button>
);

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "60px",
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="py-25 text-center">
      <div className="max-w-3xl mx-auto mb-12">
        <img
          src={TestimonialImage}
          alt="parcel icon"
          className="max-w-full mx-auto mb-5"
        />
        <h2 className="sub-heading mb-2 text-primary">
          What our customers are sayings
        </h2>
        <p className="text-desc mb-5">
         Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="px-4">
              <div className="bg-white rounded-2xl p-8 shadow-md max-w-md mx-auto">
                <FaQuoteLeft className="text-primary text-2xl mb-4" />
                <p className="text-gray-700 mb-6">{testimonial.review}</p>
                <hr className="border-dashed border-gray-300 mb-4" />
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-neutral">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
