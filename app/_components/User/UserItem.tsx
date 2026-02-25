"use client";
import type { ReactNode } from "react";

interface UserItemProps {
  children: ReactNode;
  onClick: () => void;
}

export default function UserItem({ onClick, children }: UserItemProps) {
  return (
    <div onClick={onClick} className="hover:bg-neutral-100 px-4 py-3">
      {children}
    </div>
  );
}
