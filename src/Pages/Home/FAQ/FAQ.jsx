import React from "react";

const FAQ = () => {
  return (
    <section className="py-25">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="sub-heading mb-2 text-primary">
              Frequently Asked Question (FAQ)
            </h2>
            <p className="text-desc">
              Enhance posture, mobility, and well-being effortlessly with
              Posture Pro. Achieve proper alignment, reduce pain, and strengthen
              your body with ease!
            </p>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the
              instructions sent to your email.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make
              changes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
