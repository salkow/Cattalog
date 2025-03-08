import React from 'react'
import AppRouter from './AppRouter'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60, // garbage collect old queries.
      staleTime: 1000 * 15, // refetch if re-mounted after this period. Does not refresh if still mounted.
      refetchOnMount: true, // if false, the query will not refetch even if it is stale, unless it is also removed from cache
    },
  },
})

const App: React.FC = function () {
  return (
    <QueryClientProvider client={ queryClient }>
      <ReactQueryDevtools initialIsOpen={ false } buttonPosition='bottom-left' />
      <div className='max-w-7xl max-h-auto ml-auto mr-auto mt-4'>
        <AppRouter />
      </div>
    </QueryClientProvider>
  )
}

export default App
