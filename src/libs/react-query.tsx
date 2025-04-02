"use client";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderTanstack,
} from "@tanstack/react-query";
import { useState } from "react";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProviderTanstack client={queryClient}>
      {children}
    </QueryClientProviderTanstack>
  );
};
