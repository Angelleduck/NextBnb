interface InputProps {
  label: string;
  type: string;
  id: string;
}
export default function Input({ label, type, id }: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder=" "
        className="peer w-full outline-none rounded-md p-4 pt-6 border-2 focus:border-blue-200"
      />
      <label className="transition absolute text-gray-400 left-4 origin-[0] peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-5 peer-focus:translate-y-0 translate-y-2">
        {label}
      </label>
    </div>
  );
}
