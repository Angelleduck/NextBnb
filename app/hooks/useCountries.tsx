import countries from "world-countries";

const formattedCountry = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng,
}));

export default function useCountries() {
  const getAll = formattedCountry;

  return { getAll };
}
