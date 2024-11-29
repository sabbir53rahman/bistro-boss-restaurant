import React from "react";

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  errorMessage,
  isTextarea = false, // Option to switch between input and textarea
  required = false,
  ...rest
}) => {
  return (
    <div className="input-field w-full mb-6">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}

        {isTextarea ? (
          <textarea
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none ${
              icon ? "pl-10" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4} // Default textarea rows
            required={required}
            {...rest}
          />
        ) : (
          <input
            type={type}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
              icon ? "pl-10" : ""
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            {...rest}
          />
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
