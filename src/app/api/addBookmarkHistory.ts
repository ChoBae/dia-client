type Params = {
  pkValue: number;
  accessToken: string;
};
export const addBookmarkHistory = async (params: Params): Promise<void> => {
  const { pkValue, accessToken } = params;
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/practice/histories/${pkValue}/star`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${accessToken}`,
    },
    body: JSON.stringify({ stared: true }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to edit question. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error editing question:", error);
    throw error; // Rethrow the error to be handled by the caller if necessary
  }
};
