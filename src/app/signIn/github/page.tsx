import { useRouter, useSearchParams } from "next/navigation";
import { login } from "../../../authLib";
import { getAccesstoken } from "@/app/api/getAccesstoken";
import { redirect } from "next/navigation";
import LoginAction from "./LoginAction";
import { headers } from "next/headers";
export default function Home({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const code = searchParams.code;
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  // console.log("header", headersList);
  async function createSession() {
    "use server";
    const token = await getAccesstoken(code, {
      "Content-Type": "application/json",
      "user-agent": userAgentString as string,
    }).then((res) => {
      return res.accessTokenValue;
    });
    await login(token);
    redirect("/");
  }
  return (
    <div>
      <LoginAction createSession={createSession} />
      Loading...
    </div>
  );
}
