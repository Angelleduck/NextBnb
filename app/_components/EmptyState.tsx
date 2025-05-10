"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="mt-[200px] h-[50vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <button
            onClick={() => router.replace("/")}
            className="disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-white border-black text-black text-md py-3 font-semibold border-2"
          >
            Remove all filters
          </button>
        )}
      </div>
    </div>
  );
}
