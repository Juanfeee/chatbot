type Props = {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  htmlFor: string;
};

export const InputLabel = ({
  className = "",
  value,
  children,
  ...props
}: Props) => {
  return (
    <label
      {...props}
      className={`
        block mb-1 text-sm font-semibold text-gray-700
        ${className}
      `}
    >
      {value ? value : children}
    </label>
  );
};
