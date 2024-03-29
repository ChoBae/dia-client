import mapTagToPurpose from "../../utils/mapTagToPurpose";
export const getQuestionList = async (
  category: string,
  accessToken?: string
) => {
  console.log("getQuestionList", category, accessToken);
  const headers = accessToken
    ? {
        "Content-Type": "application/json",
        authorization: accessToken,
      }
    : {
        "Content-Type": "application/json",
      };
  const categoryValues = category
    .split(",")
    .map((tag) => mapTagToPurpose(tag))
    .join(",");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/interview/questions?categoryValues=${categoryValues}`,
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions?categoryValues=${categoryValues}`,
    {
      method: "GET",
      headers: headers as HeadersInit,
      cache: "no-cache",
    }
  );
  const data = await res.json();
  console.log("data", data);
  return data.data.pageData;
};
