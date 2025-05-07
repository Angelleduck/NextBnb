"use client";

import { navigationIcon } from "../_components/Categories";

export default function IconSection({ iconLabel }: { iconLabel: string }) {
  const data = navigationIcon.find((el) => el.label == iconLabel);

  if (!data) return;

  const { icon: Icon, label, description } = data;

  return (
    <>
      <Icon size={40} className="text-neutral-500" />
      <div className="flex flex-col">
        <p className="font-semibold text-lg">{label}</p>
        <p className="font-light text-neutral-500">{description}</p>
      </div>
    </>
  );
}
