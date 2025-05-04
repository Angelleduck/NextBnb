import { ChangeEvent } from "react";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  label: string;
  type?: string;
  id: string;
  error?: boolean;
  formatPrice?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
export default function Input({
  label,
  type = "text",
  id,
  error,
  formatPrice,
  value,
  onChange,
  required,
}: InputProps) {
  return (
    <div className={`relative ${formatPrice ? "flex items-center" : ""}`}>
      {formatPrice && <BiDollar size={24} className="absolute left-2 " />}
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={label}
        min={0}
        id={id}
        required={required}
        placeholder=" "
        className={`peer w-full outline-none p-4 pt-6 ${
          formatPrice && "pl-9"
        } border-2 rounded-md ${
          error ? `focus:border-rose-300` : "focus:border-blue-200"
        } ${error ? `border-rose-300` : ""}`}
      />
      <label
        className={`transition absolute text-gray-400 left-4 origin-[0] peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-5 peer-focus:translate-y-0 translate-y-2 capitalize ${
          formatPrice && "top-0 left-9"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
