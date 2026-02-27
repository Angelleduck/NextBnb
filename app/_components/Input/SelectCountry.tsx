import Select from "react-select";
import getCountries from "@/lib/countries";
import type { LocationType } from "@/types/map";

interface LocationProps {
  handleLocation: (location: LocationType) => void;
  location: LocationType | undefined;
}

const formatOptionLabel = ({ label, flag, region }: LocationType) => (
  <div className="flex gap-3">
    <div>{flag}</div>
    <div>
      {label},<span className="text-neutral-500 ml-1">{region}</span>
    </div>
  </div>
);

export default function SelectCountry({
  handleLocation,
  location,
}: LocationProps) {
  const { getAll } = getCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      value={location}
      onChange={(country) => {
        if (country) handleLocation(country);
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary25: "#e3f2fe",
          primary: "#74c0fc",
        },
      })}
      styles={{
        control: (baseStyle) => ({
          ...baseStyle,
          padding: 12,
        }),
      }}
      className=" mb-2"
      formatOptionLabel={formatOptionLabel}
      options={getAll}
    />
  );
}
