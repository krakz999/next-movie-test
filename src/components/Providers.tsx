"use client";

import FavoritesContextProvider from "@/context/FavoritesContext";
import { queryClientOptions } from "@/utils/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [queryClient] = React.useState(
    () => new QueryClient(queryClientOptions)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesContextProvider>{children}</FavoritesContextProvider>
    </QueryClientProvider>
  );
}
