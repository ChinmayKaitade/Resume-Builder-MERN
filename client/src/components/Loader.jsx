import React from "react";

/**
 * @component Loader 🔄
 * @description A simple, purely presentational component that displays a spinning
 * circle animation to indicate that content is currently being loaded or processed.
 * Uses CSS (Tailwind) classes for styling and animation, avoiding external dependencies.
 */
const Loader = () => {
  return (
    // Outer container: Centers the loader vertically and horizontally on the screen.
    <div className="flex items-center justify-center h-screen">
      {/* Loader Spinner Element */}
      <div
        // 1. Size: Sets a fixed size (square).
        // 2. Border: Defines the base border (gray) and makes the top border transparent.
        // 3. Shape: Makes it a perfect circle.
        // 4. Animation: Applies a predefined CSS animation class (animate-spin) to rotate the element.
        className="size-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
