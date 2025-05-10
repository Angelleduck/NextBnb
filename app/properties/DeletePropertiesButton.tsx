"use client";
import { useRouter } from "next/navigation";
import { deleteProperty } from "../actions/listings";

interface DeletePropertyProps {
  propertyId: string;
}

export default function DeletePropertiesButton({
  propertyId,
}: DeletePropertyProps) {
  const router = useRouter();
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await deleteProperty(propertyId);
        router.refresh();
      }}
      className="bg-primary w-full rounded-lg py-1 text-white"
    >
      delete Property
    </button>
  );
}
