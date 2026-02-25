"use client";

import getCountries from "@/lib/countries";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function MapClient({
  locationValue,
}: {
  locationValue: string;
}) {
  const { getByValue } = getCountries();
  const location = getByValue(locationValue);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/_components/Map"), {
        loading: () => (
          <div className="rounded-lg animate-pulse">
            <div className="w-full h-[35vh] bg-gray-300 rounded"></div>
          </div>
        ),
        ssr: false,
      }),
    [],
  );
  return <Map markerPosition={location?.latlng} />;
}
