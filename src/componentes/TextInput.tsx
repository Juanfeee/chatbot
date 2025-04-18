const TextInput = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      {...props}
      type={type}
      className={`
        h-11 w-full rounded-lg border border-blue-400
        p-3 text-sm text-gray-900
        placeholder-gray-700 outline-none
        focus:border-blue-700 focus:ring-2 focus:ring-blue-100
        transition duration-150 ease-in-out
        ${className}
      `}
    />
  );
};

export default TextInput;
