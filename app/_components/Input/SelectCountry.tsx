import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import { LocationType } from "./Modal/CreateRentModal";
import getCountries from "@/libs/countries";

interface country {
  value: string;
  label: string;
  flag: string;
  region: string;
  latlng: [number, number];
}

interface LocationProps {
  handleLocation: Dispatch<SetStateAction<LocationType | undefined>>;
  location: LocationType | undefined;
}

const formatOptionLabel = ({ label, flag, region }: country) => (
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
        handleLocation(country as country);
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
