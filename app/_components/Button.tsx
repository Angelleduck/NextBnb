import type { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  Icon: IconType;
}
export default function Button({ label, Icon }: ButtonProps) {
  return (
    <button className="relative border-2 w-full border-black rounded-lg p-3 hover:opacity-80">
      <Icon size={24} className="absolute left-6" />
      {label}
    </button>
  );
}
