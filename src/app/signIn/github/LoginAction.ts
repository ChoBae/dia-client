"use client";

import { useEffect, useRef } from "react";

export default function LoginAction({ createSession } :any) {
  const createSessionRef = useRef(createSession);

  useEffect(() => {
    createSessionRef.current = createSession;
  });

  useEffect(() => {
    createSessionRef.current();
  }, []);

  return null;
}
