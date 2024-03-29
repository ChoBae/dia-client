import { useRouter, useSearchParams } from "next/navigation";
import CallBackPage from "./CallbackPage";
import { login } from "../../../../authLib";
import { getAccesstoken } from "@/app/api/getAccesstoken";
import { redirect } from "next/navigation";
import LoginAction from "./LoginAction";
export default function Home({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  // return <CallBackPage />;
  async function createSession() {
    "use server";
    const code = searchParams.code;
    const token = await getAccesstoken(code);
    await login(token.accessTokenValue);
    redirect("/");
  }
  return <LoginAction createSession={createSession} />;
}
