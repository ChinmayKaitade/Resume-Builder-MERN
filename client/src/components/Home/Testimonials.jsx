import { BookUser, BookUserIcon } from "lucide-react";
import React from "react";
import Title from "./Title";

const Testimonials = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Avery Johnson",
      handle: "@averywrites",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        {/* User Avatar */}
        <img
          className="size-11 rounded-full"
          src={card.image}
          alt={`Avatar of ${card.name}`} // Improved alt text for accessibility
        />
        <div className="flex flex-col">
          {/* User Name and Verification/Checkmark Icon (Embedded SVG) */}
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <svg
              className="mt-0.5"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                fill="#48bb78"
              />
            </svg>
          </div>
          {/* User Handle */}
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      {/* Review Text (Hardcoded placeholder text) */}
      <p className="text-sm py-4 text-gray-800">
        Radiant made undercutting all of our competitors an absolute breeze.
        {/* NOTE: This review text should be stored in the cardsData array. */}
      </p>
    </div>
  );

  return (
    <>
      <div
        id="testimonials"
        className="flex flex-col items-center my-10 scroll-mt-12"
      >
        {/* Section Tag/Badge */}
        <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 rounded-full px-6 py-1.5">
          <BookUserIcon width={14} className="size-4.5 stroke-green-600" />
          <span>Testimonials</span>
        </div>

        {/* Section Title and Description (using Title component) */}
        <Title
          title="Don't just take our words"
          description="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."
        />

        {/* --- Embedded CSS for Marquee Animation --- */}
        <style>{`
            @keyframes marqueeScroll {
                /* Start at original position */
                0% { transform: translateX(0%); } 
                /* End at halfway point (to seamlessly loop the doubled content) */
                100% { transform: translateX(-50%); } 
            }

            .marquee-inner {
                /* Apply the animation: 25s duration, linear speed, infinite loop */
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                /* Reverses the direction of the horizontal scroll animation */
                animation-direction: reverse;
            }
        `}</style>

        {/* --- Marquee Row 1 (Scrolling Left) --- */}
        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
          {/* Left Fade-out Effect */}
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

          {/* Inner Content: Contains doubled data for continuous loop */}
          <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              // Duplicating the data ensures the animation loops without a gap.
              <CreateCard key={index} card={card} />
            ))}
          </div>

          {/* Right Fade-out Effect */}
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* --- Marquee Row 2 (Scrolling Right - Reversed Animation) --- */}
        <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
          {/* Left Fade-out Effect */}
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

          {/* Inner Content: Uses marquee-reverse class */}
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>

          {/* Right Fade-out Effect */}
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
