async function requestClient<T>(endpoint: string): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
  };

  const url = `${ import.meta.env.VITE_BASE_URL }${ endpoint }`;

  return fetch(url.toString(), {
    headers,
    method: 'GET'
  })
    .then((response) => {
      if (!response.ok) {throw response;}
      return response.json() as Promise<T>;
    })
    .catch((error) => {
      throw error;
    })
}

export const request = {
  get: <T>(endpoint: string) => { return requestClient<T>(endpoint) },
}
