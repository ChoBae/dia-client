import type { HistoryType } from "@/types/History";
type Params = {
  accessToken: string | undefined;
  headers: HeadersInit;
};
export const getUserHistoryBySize = async (
  accessToken: string | undefined,
  headers: HeadersInit,
  size: number
): Promise<HistoryType[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/practice/histories?page=0&size=${size}`;
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${accessToken}`,
      ...headers,
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    if (data.status !== 200) {
      throw new Error(
        `Failed to fetch question script. Status: ${response.status}`
      );
    }
    return data.data.scrollData;
  } catch (error) {
    console.error("Error fetching question script:", error);
    throw error; // Rethrow the error to be handled by the caller if necessary
  }
};
