import axios from "axios";
import { ICharacterFilterInput } from "@/lib/interfaces";
import { buildFilterString } from "@/utils";

export const fetchCharacters = async (filters: ICharacterFilterInput) => {
  try {
    const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const stringifyFilters = `{ ${buildFilterString(filters)} }`;
    console.log(stringifyFilters);

    const graphqlQuery = {
      operationName: null,
      variables: {},
      query: `{\n  characters(\n    filters: ${stringifyFilters}\n  ) {\n    id\n    name\n    status\n    species\n    type\n    gender\n    origin {\n      id\n      name\n    }\n    location {\n      id\n      name\n    }\n    episodes {\n      id\n      name\n    }\n    image\n    url\n  isFavorite\n comments\n}\n}\n`,
    };

    const response = await axios.post(endpoint, graphqlQuery, { headers });

    return response?.data?.data?.characters || [];
  } catch (error: any) {
    console.log(error.method, error.message);

    return [];
  }
};
