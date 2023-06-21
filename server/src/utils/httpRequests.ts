import fetch from 'node-fetch';

interface HttpOptions {
  method: string;
  body?: any;
  headers?: any;
}

export const httpRequest = async (url: string, options: HttpOptions) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(url, {
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : null,
      headers: options.headers,
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};
