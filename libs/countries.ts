import countries from "world-countries";

const formattedCountry = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng,
}));

export default function getCountries() {
  const getAll = formattedCountry;
  const getByValue = (value: string) => {
    return formattedCountry.find((country) => value === country.value);
  };

  return { getAll, getByValue };
}
