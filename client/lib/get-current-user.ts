import { headers } from "next/headers";
import buildClient from "@/api/build-client";

export async function getCurrentUser() {
  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie") ?? "";

    const client = buildClient({
      req: { headers: { cookie } },
    });

    const { data } = await client.get("/api/users/currentuser");
    return data.currentUser ?? null;
  } catch {
    return null;
  }
}
