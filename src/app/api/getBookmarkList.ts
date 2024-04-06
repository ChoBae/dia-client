import mapTagToPurpose from "../../utils/mapTagToPurpose";

export const getBookmarkList = async (
  category: string,
  accessToken: string
) => {

  const categoryValues = category
    .split(",")
    .map((tag) => mapTagToPurpose(tag))
    .join(",");
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/interview/questions?categoryValues=${categoryValues}&bookmark=true`,
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/interview/questions?categoryValues=${categoryValues}&bookmark=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await res.json();
  return data.data.pageData;
};
