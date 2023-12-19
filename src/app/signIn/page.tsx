import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import Login from "./components/Login";
export default async function Page() {
  const providers = await getProviders();

  return (
    <>
      <Login providers={providers} />
    </>
  );
}