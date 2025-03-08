interface RequestClientOptions extends RequestInit {
  data?: unknown;
}

async function requestClient<T>(endpoint: string, options: RequestClientOptions): Promise<T> {
  const headers: RequestInit['headers'] = {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
  };

  const requestOptions: RequestInit = {
    method: options.method,
    headers,
  };

  if (options.data) {
    requestOptions.body = JSON.stringify(options.data);
  }

  const url = `${ import.meta.env.VITE_BASE_URL }${ endpoint }`;
  return fetch(url.toString(), requestOptions)
    .then((response) => {
      if (!response.ok) {throw response;}
      return response.json() as Promise<T>;
    })
    .catch((error) => {
      throw error;
    })
}

export const request = {
  get: <T>(endpoint: string) => { return requestClient<T>(endpoint, { method: 'GET' }) },
  post: <T>(endpoint: string, data?: unknown) => { return requestClient<T>(endpoint, { method: 'POST', data }) },
  delete: <T>(endpoint: string) => { return requestClient<T>(endpoint, { method: 'DELETE' }) },
}
