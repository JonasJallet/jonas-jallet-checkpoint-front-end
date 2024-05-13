import React, { useState } from "react";
import CreateCountryForm from "@/components/CreateCountryForm";
import { CountryList } from "@/components/CountryList";

export default function Home() {
  const [newCountry, setNewCountry] = useState(null);

  // Callback function to receive the new country object
  const handleCountryAdded = (country) => {
    setNewCountry(country);
  };

  return (
    <>
      {/* Pass the callback function to CreateCountryForm */}
      <CreateCountryForm onCountryAdded={handleCountryAdded} />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3>Here you can find a list of country that might interest you</h3>
      </div>
      {/* Pass the new country object to CountryList */}
      <CountryList newCountry={newCountry} />
    </>
  );
}
