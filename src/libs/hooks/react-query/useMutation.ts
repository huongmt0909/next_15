import {
  UseMutationOptions,
  UseMutationResult,
  useMutation as useReactQueryMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import BaseApi from "@/services/base_api";

const baseApi = new BaseApi();

// Utility function to create mutation function
export const createMutation = <TData, TVariables>(endpoint: string) => {
  return async (variables: TVariables): Promise<TData> => {
    const { data } = await baseApi.post(endpoint, variables);
    return data;
  };
};

type MutationConfig<TData, TVariables> = {
  mutation: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError) => void;
  onSettled?: () => void;
};

export const useMutation = <
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
>({
  mutation,
  onSuccess,
  onError,
  onSettled,
  ...options
}: MutationConfig<TData, TVariables> &
  Omit<
    UseMutationOptions<TData, AxiosError, TVariables, TContext>,
    "mutationFn"
  >): UseMutationResult<TData, AxiosError, TVariables, TContext> => {
  return useReactQueryMutation<TData, AxiosError, TVariables, TContext>({
    mutationFn: mutation,
    onSuccess: (data: TData) => {
      onSuccess?.(data);
    },
    onError: (error: AxiosError) => {
      onError?.(error);
    },
    onSettled: () => {
      onSettled?.();
    },
    ...options,
  });
};

// Example usage:
/*
interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

// Create mutation function
const loginMutation = createMutation<LoginResponse, LoginVariables>('/api/login');

// In your component:
const { mutate, isLoading, error } = useMutation<LoginResponse, LoginVariables>({
  mutation: loginMutation,
  onSuccess: (data) => {
    console.log('Login successful:', data);
  },
  onError: (error) => {
    console.error('Login failed:', error);
  },
});

// Usage:
mutate({
  email: 'user@example.com',
  password: 'password123'
});
*/
