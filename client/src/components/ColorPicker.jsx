import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  // Predefined palette of colors available for selection.
  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
  ];

  // State to control the visibility of the color palette dropdown.
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Outer container wrapper, critical for positioning the absolute dropdown.
    <div className="relative">
      {/* Toggle Button: Opens and closes the color selection grid */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 rounded-lg"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown Panel: Renders conditionally when isOpen is true */}
      {isOpen && (
        // Palette Grid Layout
        <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col"
              onClick={() => {
                // 1. Call the parent handler to update the selected color state.
                onChange(color.value);
                // 2. Close the dropdown after selection.
                setIsOpen(false);
              }}
            >
              {/* Color Swatch */}
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                style={{ backgroundColor: color.value }}
              ></div>

              {/* Checkmark Indicator: Only visible if this color is the currently selected color */}
              {selectedColor === color.value && (
                <div className="absolute top-0 left-0 right-0 bottom-4 flex items-center justify-center">
                  <Check className="size-5 text-white" />
                </div>
              )}

              {/* Color Name Label */}
              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
