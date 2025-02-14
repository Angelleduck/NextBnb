import { ReactNode } from "react";

interface UserItemProps {
  children: ReactNode;
}
export default function UserItem({ children }: UserItemProps) {
  return <div className="hover:bg-neutral-100 px-4 py-3">{children}</div>;
}
