import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Country } from "@/graphql/generated/schema";

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      continent {
        id
        name
      }
      emoji
      id
      name
    }
  }
`;

const CONTINENTS_QUERY = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;

function CountryForm({
  onCountryAdded,
}: {
  onCountryAdded: (country: Country) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    code: "",
    continent: "",
  });

  const { loading: continentsLoading, data: continentsData } =
    useQuery(CONTINENTS_QUERY);

  const [addCountry, { loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_COUNTRY);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const continentId = continentsData.continents.find(
        (continent: { name: string }) => continent.name === formData.continent
      )?.id;
      if (!continentId) {
        throw new Error("Continent ID not found");
      }

      const { data } = await addCountry({
        variables: {
          data: {
            name: formData.name,
            emoji: formData.emoji,
            code: formData.code,
            continent: { id: continentId },
          },
        },
      });

      if (data && data.addCountry) {
        onCountryAdded(data.addCountry);
      }

      setFormData({
        name: "",
        emoji: "",
        code: "",
        continent: "",
      });
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  return (
    <div className="my-8 mx-16 bg-gray-200 border border-gray-300 rounded-md">
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-col lg:flex-row justify-between p-6"
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-1 h-9 lg:w-36"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="emoji">Emoji</label>
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={formData.emoji}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-1 h-9 lg:w-36"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="code">Country Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="border border-gray-400 rounded-md p-1 h-9 lg:w-36"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="continent">Continent</label>
          <select
            id="continent"
            name="continent"
            className="border border-gray-400 rounded-md p-1 h-9 lg:w-40"
            value={formData.continent}
            onChange={handleChange}
            required
          >
            <option value="">Select Continent</option>
            {continentsLoading ? (
              <option disabled>Loading...</option>
            ) : (
              continentsData &&
              continentsData.continents.map(
                (continent: { id: string; name: string }) => (
                  <option key={continent.id} value={continent.name}>
                    {continent.name}
                  </option>
                )
              )
            )}
          </select>
        </div>
        <button
          className="bg-primary_color text-white p-3 my-2 rounded-md"
          type="submit"
          disabled={mutationLoading}
        >
          {mutationLoading ? "Adding..." : "Add"}
        </button>
        {mutationError && <p>Error: {mutationError.message}</p>}
      </form>
    </div>
  );
}

export default CountryForm;
