"use client";
import { getAccesstoken } from "@/app/api/getAccesstoken";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getUser } from "@/app/api/getUser";
// import { login } from "../../../../authLib";
// import Cookies from "js-cookie";
const CallBackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = useCallback(async () => {
    const code = searchParams.get("code");
    console.log(code);
    console.log("콜백페이지");
    if (code) {
      try {
        const resp = await getAccesstoken(code);
        const token = resp.accessTokenValue;
        // await login(token);
        router.push("/");
      } catch (err) {}
    }
  }, [searchParams, router]);

  return <div>Loading...</div>;
};

export default CallBackPage;
