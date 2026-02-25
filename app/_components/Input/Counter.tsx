import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subTitle: string;
  value: number;
  handleCount: (value: number) => void;
}

export default function Counter({
  title,
  subTitle,
  value,
  handleCount,
}: CounterProps) {
  const onAdd = () => {
    handleCount(value + 1);
  };

  const onSubstract = () => {
    if (value === 1) return;
    handleCount(value - 1);
  };
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3>{title}</h3>
        <p className="font-light text-neutral-600">{subTitle}</p>
      </div>

      <div className="flex gap-4 items-center">
        <div
          onClick={onSubstract}
          className="border border-neutral-400 text-neutral-600 h-10 w-10 flex items-center justify-center rounded-full"
        >
          <AiOutlineMinus />
        </div>
        <span className="text-neutral-600 text-xl">{value}</span>
        <div
          onClick={onAdd}
          className="border border-neutral-400 text-neutral-600 h-10 w-10 flex items-center justify-center rounded-full"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
