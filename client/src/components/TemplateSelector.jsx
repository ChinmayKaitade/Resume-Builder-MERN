import React, { useState } from "react";
import { Check, Layout } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  // State to control the visibility of the dropdown menu.
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic", // Corrected capitalization for display
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern", // Corrected capitalization for display
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a simple image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },
  ];

  return (
    // Outer container: Critical for relative positioning of the absolute dropdown.
    <div className="relative">
      {/* Toggle Button: Opens/Closes the template selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>

      {/* Dropdown Panel: Renders conditionally when isOpen is true */}
      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {/* Map over the templates array to render each selection card */}
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                // 1. Call the parent handler to update the selected template ID.
                onChange(template.id);
                // 2. Close the dropdown after selection.
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                // Conditional styling based on whether this template is currently selected
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {/* Selected Indicator (Checkmark) */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Template Name and Preview Description */}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <p className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
