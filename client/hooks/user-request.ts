import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface UseRequestProps {
  url: string;
  method: HttpMethod;
  body?: Record<string, unknown>;
  onSuccess?: (data: unknown) => void;
}

export default function useRequest({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const doRequest = async (requestBody?: Record<string, unknown>) => {
    setErrors([]);
    setIsLoading(true);

    const payload = requestBody ?? body;
    const config: AxiosRequestConfig = { withCredentials: true };

    try {
      const response =
        method === "get" || method === "delete"
          ? await axios[method](url, config)
          : await axios[method](url, payload, config);

      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        setErrors(
          err.response.data.errors.map((e: { message: string }) => e.message)
        );
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { doRequest, errors, isLoading };
}
