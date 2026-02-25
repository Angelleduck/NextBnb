import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps<
  T extends FieldValues,
> extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  type: React.HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  id: Path<T>;
  error?: boolean;
  formatPrice?: boolean;
  value?: string | number;
  required?: boolean;
  onchange?: (value: string) => void;
}
export default function Input<T extends FieldValues>({
  label,
  type = "text",
  register,
  id,
  error,
  formatPrice,
}: InputProps<T>) {
  return (
    <div className={`relative ${formatPrice ? "flex items-center" : ""}`}>
      {formatPrice && <BiDollar size={24} className="absolute left-2" />}
      <input
        {...register(id)}
        type={type}
        min={0}
        id={id}
        placeholder=""
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
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
