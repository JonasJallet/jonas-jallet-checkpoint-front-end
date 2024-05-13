import { gql, useQuery } from "@apollo/client";
import { CountriesQuery } from "@/graphql/generated/schema";
import Link from "next/link";
import Loader from "@/components/Loader";

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

export default function Home() {
  const { data, loading, error } = useQuery<CountriesQuery>(LIST_COUNTRIES);

  const loadingOrError = () => {
    if (loading || error) {
      return <>{loading ? <Loader /> : <h2>Something went wrong</h2>}</>;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3>Here you can find a list of country that might interest you</h3>
      </div>

      {!data ? (
        loadingOrError()
      ) : (
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {data.countries.map(({ id, code, name, emoji }) => (
            <Link href={`/countries/${code}`} key={code}>
              <div className="max-w-xs rounded overflow-hidden border border-grey-500 hover:border-primary_color cursor-pointer shadow-lg text-center w-36">
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
}
