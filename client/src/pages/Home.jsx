import React from "react";
import Banner from "../components/Home/Banner";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import CallToAction from "../components/Home/CallToAction";

const Home = () => {
  return (
    <div className="home-page-container">
      <Banner />

      <Hero />

      <Features />

      <Testimonials />

      <CallToAction />

      <Footer />
    </div>
  );
};

export default Home;
