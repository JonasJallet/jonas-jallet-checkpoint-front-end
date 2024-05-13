import React, { useState } from "react";
import CreateCountryForm from "@/components/CreateCountryForm";
import { CountryList } from "@/components/CountryList";
import { Country } from "@/graphql/generated/schema";

export default function Home() {
  const [newCountry, setNewCountry] = useState<Country | null>(null);
  const handleCountryAdded = (country: Country) => {
    setNewCountry(country);
  };

  return (
    <>
      <CreateCountryForm onCountryAdded={handleCountryAdded} />
      <CountryList newCountry={newCountry} />
    </>
  );
}
