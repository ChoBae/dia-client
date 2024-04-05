export const getMultiPracticeDetails = async (
  id: string,
  accessToken?: string,
  headers?: HeadersInit
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/practice/collections/${id}`;

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { authorization: accessToken } : {}),
      ...headers,
    },
  });
  const data = await res.json();

  return data.data;
};
