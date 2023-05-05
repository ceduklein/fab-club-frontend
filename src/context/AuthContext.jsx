import { createContext ,useContext, useState, FormEvent, useEffect } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import Router from 'next/router';

import { setupApiClient } from '@/services/api';

export const AuthContext = createContext();

export function signOut() {
  try {
    destroyCookie(undefined, '@auth.userId');
    Router.push('/');
  } catch {
    console.log('Erro ao deslogar');
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  const api = setupApiClient();

  useEffect(() => {
    
  })

  async function signIn(email, password) {
    let data = { email, password };

    try {
      const response = await api.post('/usuarios/login', data);
      console.log(response.data);

      const { id, name, cpf, telefone, admin, carteirinhaEmitida, 
        carteirinhaEnviada, dataNascimento } = response.data;

      setCookie(undefined, '@auth.userId', id, {
        maxAge: 15 * 15 * 24 * 30,
        path: '/'
      });

      setUser({ id, name, email, cpf, telefone, admin, 
        carteirinhaEmitida, carteirinhaEnviada, dataNascimento });

      Router.push('/dashboard');

    } catch(err) {
      console.log('Erro: ', err);
    }
  }

  return(
    <AuthContext.Provider value = {{ user, isAuthenticated, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}