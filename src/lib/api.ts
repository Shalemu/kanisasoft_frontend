export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  // Automatically set Content-Type for JSON bodies
  if (!options.body || (typeof options.body === 'string' && options.body.trim().startsWith('{'))) {
    headers['Content-Type'] = 'application/json';
  }

  // Add token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : {};

    // Log for debugging purposes
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[apiFetch] ${endpoint} response:`, data);
    }

    // Handle unsuccessful responses
    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        message: data?.message || 'Kuna tatizo limejitokeza.',
        ...(data.errors ? { errors: data.errors } : {}),
      };
    }

    // Return parsed response + no error
    return { error: false, ...data };
  } catch (err: any) {
    // Handle fetch/network errors
    return {
      error: true,
      message: err.message || 'Tatizo la mtandao. Jaribu tena.',
    };
  }
}
