import axios from "axios";

export const setCommentMutation = async (
  characterId: number,
  comment: string
) => {
  try {
    const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const graphqlQuery = {
      operationName: null,
      variables: {},
      query: `mutation {\n  addComment(id: ${characterId}, comment: "${comment}") {\n    name\n  }\n}\n`,
    };

    const response = await axios.post(endpoint, graphqlQuery, { headers });

    return true;
  } catch (error: any) {
    console.log(error.method, error.message);
    return false;
  }
};
