import React from "react";

/**
 * @component Banner 📢
 * @description A persistent or temporary announcement banner displayed at the top
 * of the application or landing page. It typically alerts users to new features,
 * promotions, or important updates.
 * (This component is purely presentational and manages no state.)
 */
const Banner = () => {
  return (
    // Outer Container: Applies full width, padding, text styling, and a subtle gradient background.
    <div className="w-full py-2.5 font-medium text-sm text-green-800 text-center bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF]">
      <p>
        {/* Highlight/Badge: Used to draw attention to the announcement status. */}
        <span className="px-3 py-1 rounded-lg text-white bg-green-600 mr-2">
          New
        </span>
        AI Feature Added
      </p>
    </div>
  );
};

export default Banner;
