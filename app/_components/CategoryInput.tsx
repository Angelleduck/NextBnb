import { IconType } from "react-icons";

interface CategoryProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: (label: string) => void;
}
export default function CategoryInput({
  icon: Icon,
  label,
  onClick,
  selected,
}: CategoryProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col border-2 gap-2 rounded-xl p-4 ${
        selected && "border-black"
      } cursor-pointer hover:border-black`}
    >
      <Icon size={30} />
      <p>{label}</p>
    </div>
  );
}
