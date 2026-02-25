import { type ReadonlyURLSearchParams, useRouter } from "next/navigation";
import type { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  searchParams: ReadonlyURLSearchParams;
}
export default function CategoryBox({
  icon: Icon,
  label,
  searchParams,
}: CategoryBoxProps) {
  const router = useRouter();
  const selected = searchParams.get("category") === `${label}`;
  return (
    <div
      onClick={() => {
        if (selected) {
          router.push("/");
        } else {
          router.push(`/?category=${label}`);
        }
      }}
      className={`flex flex-col items-center p-3 text-neutral-500 hover:text-neutral-800 ${
        selected ? "text-neutral-800" : ""
      } cursor-pointer gap-1 `}
    >
      <div>{<Icon size={26} />}</div>
      <div>{label}</div>
    </div>
  );
}
