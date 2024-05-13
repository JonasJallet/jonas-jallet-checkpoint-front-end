import { CountriesQuery } from "@/graphql/generated/schema";
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

export const CountryList = () => {
  const { data, loading, error } = useQuery<CountriesQuery>(LIST_COUNTRIES);

  const loadingOrError = () => {
    if (loading || error) {
      return <>{loading ? <Loader /> : <h2>Something went wrong</h2>}</>;
    }
  };

  return (
    <>
      {loadingOrError()}
      {data && (
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {data.countries.map(({ id, code, name, emoji }) => (
            <Link href={`/countries/${code}`} key={code}>
              <div className="max-w-xs rounded overflow-hidden border border-grey-400 hover:border-primary_color cursor-pointer text-center w-36">
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
