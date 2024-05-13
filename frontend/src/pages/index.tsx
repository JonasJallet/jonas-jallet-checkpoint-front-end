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
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3>Here you can find a list of country that might interest you</h3>
      </div>
      <CountryList newCountry={newCountry} />
    </>
  );
}
