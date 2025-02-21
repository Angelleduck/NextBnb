interface InputProps {
  label: string;
  type: string;
  id: string;
  error: boolean;
}
export default function Input({ label, type, id, error }: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        name={label}
        id={id}
        placeholder=" "
        className={`peer w-full outline-none p-4 pt-6 border-2 rounded-md ${
          error ? `focus:border-rose-300` : "focus:border-blue-200"
        } ${error ? `border-rose-300` : ""}`}
      />
      <label className="transition absolute text-gray-400 left-4 origin-[0] peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-5 peer-focus:translate-y-0 translate-y-2 capitalize">
        {label}
      </label>
    </div>
  );
}
