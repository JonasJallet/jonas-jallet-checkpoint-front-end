import { useEffect, useState } from "react";
import { CountriesQuery, Country } from "@/graphql/generated/schema";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Loader from "./Loader";

const LIST_COUNTRIES = gql`
  query Countries {
    countries {
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

export const CountryList = ({ newCountry }: { newCountry: Country | null }) => {
  const { data, loading, error } = useQuery<CountriesQuery>(LIST_COUNTRIES);

  const loadingOrError = () => {
    if (loading || error) {
      return <>{loading ? <Loader /> : <h2>Something went wrong</h2>}</>;
    }
  };

  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    if (data && data.countries) {
      setCountries(data.countries);
    }
  }, [data]);

  useEffect(() => {
    if (newCountry) {
      setCountries((prevCountries) => [...prevCountries, newCountry]);
    }
  }, [newCountry]);

  return (
    <>
      {loadingOrError()}
      {countries.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {countries.map(({ id, code, name, emoji }) => (
            <Link href={`/countries/${code}`} key={code}>
              <div className="max-w-xs rounded overflow-hidden border border-gray-400 hover:border-primary_color cursor-pointer text-center w-36">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{name}</div>
                  <p className="text-xl">{emoji}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
