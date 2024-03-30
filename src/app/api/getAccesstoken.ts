type Params = {
  id: number | null | undefined;
  accessToken: string | undefined;
};
export const getAccesstoken = async (code: string, headers: any): Promise<any> => {
  if (!code) {
    throw new Error("code is required");
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/auth/oauth/github`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ code: code }),
  };
  // console.log('api url', apiUrl,headers)
  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    // console.log('test', data)
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
