import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
}
export default function CategoryBox({ icon: Icon, label }: CategoryBoxProps) {
  return (
    <div className="flex flex-col items-center p-3 text-neutral-500 hover:text-neutral-800 cursor-pointer  gap-1 ">
      <div>{<Icon size={26} />}</div>
      <div>{label}</div>
    </div>
  );
}

// box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
