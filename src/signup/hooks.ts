import { useEffect, useState } from "react";

import { client } from "@/infra/http";
import { Values } from "@/signup";

export function useCreateSignup() {
  const [error, setError] = useState<unknown | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function mutate(data: Values) {
    try {
      setLoading(true);
      await client.post<Values>("/482f54f0-315b-43ac-b0b4-a32953a99e78", data);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  return {
    error,
    loading,
    success,
    mutate,
    setSuccess,
  };
}
