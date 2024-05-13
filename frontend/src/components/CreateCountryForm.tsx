import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

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

const CountryForm = () => {
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

      await addCountry({
        variables: {
          data: {
            name: formData.name,
            emoji: formData.emoji,
            code: formData.code,
            continent: { id: continentId },
          },
        },
      });
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
    <div className="flex flex-col gap-4 justify-center items-center">
      <h3>Add a New Country</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Country Name"
          required
        />
        <input
          type="text"
          name="emoji"
          value={formData.emoji}
          onChange={handleChange}
          placeholder="Emoji"
          required
        />
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Country Code"
          required
        />
        <select
          name="continent"
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
        <button type="submit" disabled={mutationLoading}>
          {mutationLoading ? "Adding..." : "Add Country"}
        </button>
        {mutationError && <p>Error: {mutationError.message}</p>}
      </form>
    </div>
  );
};

export default CountryForm;
