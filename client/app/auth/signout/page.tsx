"use client";

import { useEffect } from "react";
import useRequest from "../../../hooks/user-request";
import { useRouter } from "next/navigation";

export default function SignoutPage() {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="page-container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="card w-full max-w-md text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        <h1 className="text-xl font-semibold text-slate-900">Signing you out...</h1>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ll redirect you to the home page in a moment.
        </p>
      </div>
    </div>
  );
}
