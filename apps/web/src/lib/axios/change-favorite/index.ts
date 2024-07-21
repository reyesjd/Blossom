import axios from "axios";
import { buildFilterString } from "@/utils";

export const setFavoriteState = async (characterId: number) => {
  try {
    const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const graphqlQuery = {
      operationName: null,
      variables: {},
      query: `mutation {\n  favoriteCharacter(id: ${characterId}) {\n    name\n  }\n}\n`,
    };

    const response = await axios.post(endpoint, graphqlQuery, { headers });

    return true;
  } catch (error: any) {
    console.log(error.method, error.message);
    return false;
  }
};
