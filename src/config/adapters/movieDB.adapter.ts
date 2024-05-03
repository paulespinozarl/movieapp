import {API_KEY, BASE_URL} from '@env';
import {AxiosAdapter} from './http/axios.adapter';

export const movieDBFetcher = new AxiosAdapter({
  baseUrl: BASE_URL,
  params: {
    api_key: API_KEY,
    lenguage: 'es',
  },
});
