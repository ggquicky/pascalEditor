import axios from 'axios';

let authToken: string | null = null;
let apiBaseUrl: string = '';

export const setApiConfig = (config: { token: string | null; baseUrl: string }) => {
  authToken = config.token;
  apiBaseUrl = config.baseUrl;
};

const getClient = () => {
  return axios.create({
    baseURL: apiBaseUrl,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'Content-Type': 'application/json',
    },
  });
};

export const api = {
  get: async <T>(url: string) => {
    const response = await getClient().get<T>(url);
    return response.data;
  },
  post: async <T>(url: string, data: any) => {
    const response = await getClient().post<T>(url, data);
    return response.data;
  },
  put: async <T>(url: string, data: any) => {
    const response = await getClient().put<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string) => {
    const response = await getClient().delete<T>(url);
    return response.data;
  },
};
