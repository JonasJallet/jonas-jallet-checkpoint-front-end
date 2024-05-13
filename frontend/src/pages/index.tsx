import { gql, useQuery } from "@apollo/client";
import { CountriesQuery } from "@/graphql/generated/schema";
import Link from "next/link";
import Loader from "@/components/Loader";
import CreateCountryForm from "@/components/CreateCountryForm";
import { CountryList } from "@/components/CountryList";

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
      <CreateCountryForm />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3>Here you can find a list of country that might interest you</h3>
      </div>
      <CountryList />
    </>
  );
}
