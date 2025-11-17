import React from "react";
// Import individual sections that compose the structure of the Home page.
// These are typically located in a subdirectory (e.g., ../components/Home/).
import Banner from "../components/Home/Banner";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import CallToAction from "../components/Home/CallToAction";

/**
 * @component Home 🏠
 * @description The main Landing Page component.
 * This component acts as a container, arranging the various sections of the
 * marketing site in the correct vertical order (structural composition).
 * It manages no state (purely presentational).
 */
const Home = () => {
  return (
    // Top-level container for the entire page content.
    <div className="home-page-container">
      {/* 1. Top Banner: Often used for announcements or promotions. */}
      <Banner />
      {/* 2. Hero Section: The main, attention-grabbing introduction to the product/service. */}
      <Hero />
      {/* 3. Features: Highlights key product functionalities or benefits. */}
      <Features />
      {/* 4. Testimonials: Social proof showing customer feedback. */}
      <Testimonials />
      {/* 5. Call to Action (CTA): Prompts the user to sign up, start building, etc. */}
      <CallToAction />
      {/* 6. Footer: Contains navigation links, contact info, and copyright. */}
      <Footer />
    </div>
  );
};

export default Home;
