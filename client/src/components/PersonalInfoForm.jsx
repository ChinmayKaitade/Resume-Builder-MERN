import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    // Immutably updates the data object and calls the parent's onChange prop.
    onChange({ ...data, [field]: value });
  };

  // Array of objects defining all input fields for dynamic rendering.
  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text", // Changed from 'url' as this is usually text-based
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get Started with the personal information
      </p>

      {/* Image Upload and Options */}
      <div className="flex items-center gap-2">
        {/* Image Display / Upload Trigger */}
        <label>
          {data.image ? (
            // Display: If image data exists, show the image.
            <img
              src={
                // Conditional URL generation: use the string URL if provided,
                // or create a temporary object URL if it's a new File object.
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="User Image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            // Default Upload Prompt: Shown when no image data exists.
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload User Image
            </div>
          )}

          {/* Hidden File Input: Triggers the image upload */}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            // On change, capture the first selected file and update the 'image' field in state.
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Image Processing Option: Only shown if a new File object has been selected */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove Background</p>
            {/* Custom Toggle Switch (AI Enhancement Placeholder) */}
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              {/* Styling for the toggle switch */}
              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
            </label>
            {/* NOTE: If the toggle is active, the ResumeBuilder component should
                handle the background removal API call before saving. */}
          </div>
        )}
      </div>

      {/* Dynamic Form Generation */}
      {fields.map((field) => {
        // Use the Icon component defined in the field configuration.
        const Icon = field.icon;

        return (
          <div key={field.key} className="space-y-1 mt-5">
            {/* Field Label and Icon */}
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {/* Input Element */}
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
