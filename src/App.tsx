import React, { useEffect } from 'react';
import AppRouter from './AppRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeColorScheme } from './utilities/utils';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 5, // garbage collect old queries.
      staleTime: Infinity, // refetch if re-mounted after this period. Does not refresh if still mounted.
      refetchOnMount: true, // if false, the query will not refetch even if it is stale, unless it is also removed from cache
    },
  },
});

const App: React.FC = function () {
  useEffect(() => {
    initializeColorScheme();
  }, []);

  return (
    <QueryClientProvider client={ queryClient }>
      <ReactQueryDevtools initialIsOpen={ false } buttonPosition='bottom-left' />
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
