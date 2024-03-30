type Params = {
  id: number;
  accessToken?: string;
  headers?: HeadersInit;
};
export const getQuestionDetails = async (params: Params) => {
  const { id, accessToken } = params;

  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/interview/questions/${id}`,
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...params.headers,
        ...(accessToken ? { authorization: accessToken } : {}),
      } as HeadersInit,
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data;
};
