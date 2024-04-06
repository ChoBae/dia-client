export const getPracticeList = async (
  // accessToken?: string,
  headers?: HeadersInit
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/practice/collections`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ...(accessToken ? { authorization: accessToken } : {}),
        ...headers,
      } as HeadersInit,
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data.data;
};
