import mapTagToPurpose from "../../utils/mapTagToPurpose";

export const getQuestionList = async (
  category: string,
  accessToken?: string,
  headers?: HeadersInit
) => {
  const categoryValues = category
    .split(",")
    .map((tag) => mapTagToPurpose(tag))
    .join(",");
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/proxy/v0/interview/questions?categoryValues=${categoryValues}`,
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions?categoryValues=${categoryValues}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { authorization: accessToken } : {}),
        ...headers,
      } as HeadersInit,
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data.data.pageData;
};
