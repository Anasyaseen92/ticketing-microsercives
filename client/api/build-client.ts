import axios from "axios";

const INGRESS_HOST =
  process.env.INGRESS_HOST ?? "nas-ticketing.dev";

const SERVER_BASE_URL =
  process.env.AUTH_INTERNAL_URL ??
  "http://ingress-nginx.ingress-nginx.svc.cluster.local";

export default ({ req }: { req?: { headers?: Record<string, string> } }) => {
  if (typeof window === "undefined") {
    const headers: Record<string, string> = {
      Host: INGRESS_HOST,
    };

    if (req?.headers?.cookie) {
      headers.Cookie = req.headers.cookie;
    }

    return axios.create({
      baseURL: SERVER_BASE_URL,
      headers,
    });
  }

  return axios.create({
    baseURL: "/",
    withCredentials: true,
  });
};
