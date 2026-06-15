import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface UseRequestProps {
  url: string;
  method: HttpMethod;
  body?: Record<string, unknown>;
    onSuccess?: (data: any) => void; 
}

export default function useRequest({ url, method, body }: UseRequestProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const doRequest = async () => {
    setErrors([]); // clear previous errors before each request
    try {
      const config: AxiosRequestConfig = {};
      let response;

      if (method === "get" || method === "delete") {
        response = await axios[method](url, config);
      } else {
        response = await axios[method](url, body, config);
      }

      return response.data;
    } catch (err) {
      // Extract error messages from Axios error response
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setErrors(err.response.data.errors.map((e: { message: string }) => e.message));
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  return { doRequest, errors };
}