import { useEffect } from "react";
import useRequest from "../../../hooks/user-request";
import { useRouter } from "next/navigation";

export default function SignoutPage() {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
}