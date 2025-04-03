import {
  UseQueryOptions,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import BaseApi from "@/services/base_api";

const baseApi = new BaseApi();

// Utility function to create query function
export const createQuery = <TData>(endpoint: string) => {
  return async (): Promise<TData> => {
    const { data } = await baseApi.get(endpoint);
    return data;
  };
};

// Utility function to create parameterized query function
export const createParamQuery = <TData, TParams>(
  endpoint: string,
  paramTransform?: (params: TParams) => string
) => {
  return async (params: TParams): Promise<TData> => {
    const transformedParams = paramTransform ? paramTransform(params) : params;
    const queryString = new URLSearchParams(
      transformedParams as any
    ).toString();
    const finalEndpoint = `${endpoint}${queryString ? `?${queryString}` : ""}`;
    const { data } = await baseApi.get(finalEndpoint);
    return data;
  };
};

type QueryConfig<TData, TParams = void, TError = AxiosError> = {
  query: TParams extends void
    ? () => Promise<TData>
    : (params: TParams) => Promise<TData>;
  params?: TParams;
  enabled?: boolean;
} & Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">;

export const useQuery = <TData = unknown, TParams = void, TError = AxiosError>(
  config: QueryConfig<TData, TParams, TError>
) => {
  const { query, params, ...options } = config;
  const queryKey = params ? [query.name, params] : [query.name];

  return useReactQuery<TData, TError, TData>({
    ...options,
    queryKey,
    queryFn: () => (params ? query(params) : (query as () => Promise<TData>)()),
  });
};

/* Example usage:

// Simple query
interface UserResponse {
  id: string;
  name: string;
  email: string;
}

const getUserQuery = createQuery<UserResponse>('/api/user/profile');

// In component:
const { data, isLoading, error } = useQuery({
  query: getUserQuery,
  onSuccess: (data) => {
    console.log('User data:', data);
  },
});

// Parameterized query
interface UsersResponse {
  users: UserResponse[];
  total: number;
}

interface UsersParams {
  page: number;
  limit: number;
  search?: string;
}

const getUsersQuery = createParamQuery<UsersResponse, UsersParams>('/api/users');

// In component:
const { data, isLoading, error } = useQuery({
  query: getUsersQuery,
  params: {
    page: 1,
    limit: 10,
    search: 'john'
  },
  enabled: true,
  onSuccess: (data) => {
    console.log('Users list:', data);
  },
});
*/
