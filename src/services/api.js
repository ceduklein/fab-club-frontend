import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { AuthError } from './errors/AutheError';
import { signOut } from '@/context/AuthContext';

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  
  const api = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  if(cookies) {
    api.interceptors.response.use(response => {
      return response;
    }, (error) => {
      if(error.response.status === 401) {
        if(typeof window !== undefined) {
          // Chamar função signout
          signOut();
        } else {
          return Promise.reject(new AuthError());
        }
      }
  
      return Promise.reject(error);
    })
  
    return api;
  }
}