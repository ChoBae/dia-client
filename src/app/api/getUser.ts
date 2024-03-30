type Params = {
  id: number | null | undefined;
  accessToken: string | undefined;
};
export const getUser = async (accessToken: string , headers: any): Promise<any> => {
  if (!accessToken) {
    throw new Error("accessToken is required");
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/members/me`;
  // const apiUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/members/me`;
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      ...headers,
      authorization: accessToken,
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    if (data.status !== 200) {
      switch (response.status) {
        case 401:
          throw new Error("Unauthorized");
        case 403:
          throw new Error("Forbidden");
        case 404:
          return null;
        default:
          throw new Error(
            `Failed to fetch question script. Status: ${response.status}`
          );
      }
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching question script:", error);
    throw error; // Rethrow the error to be handled by the caller if necessary
  }
};
