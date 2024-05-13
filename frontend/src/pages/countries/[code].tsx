import { gql, useQuery } from "@apollo/client";
import {
  CountryQuery,
  CountryQueryVariables,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Link from "next/link";

const FIND_COUNTRY_BY_CODE = gql`
  query Country($code: String!) {
    country(code: $code) {
      code
      continent {
        id
        name
      }
      emoji
      name
      id
    }
  }
`;

function Country() {
  const router = useRouter();
  const { code } = router.query;

  const { data, loading, error } = useQuery<
    CountryQuery,
    CountryQueryVariables
  >(FIND_COUNTRY_BY_CODE, {
    variables: { code: code as string },
  });

  if (loading) return Loader;
  if (!data || !data.country) return <div>No country found</div>;

  const { country } = data;

  return (
    <div className="flex flex-col text-center p-16">
      <p className="text-8xl">{country.emoji}</p>
      <div className="pt-8">
        <p>
          Name : {country.name} ({country.code})
        </p>
        {country.continent && <p>Continent: {country.continent.name}</p>}
      </div>
      <Link href="/">
        <div className="flex items-center mt-8 text-primary_color cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Index</span>
        </div>
      </Link>
    </div>
  );
}

export default Country;
