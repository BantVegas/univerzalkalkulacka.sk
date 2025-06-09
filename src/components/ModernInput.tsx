import { useId } from "react";

type Props = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ModernInput({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: Props) {
  const id = useId();
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="peer block w-full rounded-lg border border-gray-300 bg-white/90 px-4 pt-6 pb-2 text-lg shadow-inner placeholder-transparent focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 transition"
        placeholder=" "
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-gray-500 text-base transition-all duration-300
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg
          peer-focus:top-2 peer-focus:text-base peer-focus:text-sky-600"
      >
        {label}
      </label>
    </div>
  );
}

