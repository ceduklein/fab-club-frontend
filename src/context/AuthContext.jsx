import { createContext , useState, useEffect } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import { toast } from 'react-toastify';

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
    const { '@auth.userId': id } = parseCookies();

    if (id) {
      async function fetchData() {
        try {
          const response = await api.get(`/usuarios/${id}`);
          
          const { nome, email, cpf, telefone, admin, carteirinhaEmitida, 
            carteirinhaEnviada, dataNascimento } = response.data;
          
          setUser({ id, nome, email, cpf, telefone, admin, 
            carteirinhaEmitida, carteirinhaEnviada, dataNascimento });

        } catch(err) {
          signOut();
        }  
      }
      fetchData();
    } else {
      signOut();
    }
  },[]);

  async function signIn(email, password) {
    let data = { email, password };

    try {
      const response = await api.post('/usuarios/login', data);
      
      const { id, nome, email, cpf, telefone, admin, carteirinhaEmitida, 
        carteirinhaEnviada, dataNascimento } = response.data;

      setCookie(undefined, '@auth.userId', id, {
        maxAge: 15 * 15 * 24 * 30,
        path: '/'
      });

      setUser({ id, nome, email, cpf, telefone, admin, 
        carteirinhaEmitida, carteirinhaEnviada, dataNascimento });
      
      toast.success('Login efetuado com sucesso.');

      Router.push('/dashboard');

    } catch(err) {
      toast.error('Erro ao tentar logar.');
      console.log('Erro: ', err);
    }
  }

  async function signUp(data) {
    try {
      await api.post('usuarios/cadastro', data);

      toast.success('Cadastro efetuado com sucesso.');
      Router.push('/');

    } catch (err) {
      toast.error('Erro ao efetuar o cadastro.');
      console.log('Erro ao cadastrar. ', err);
    }
  }

  return(
    <AuthContext.Provider value = {{ user, isAuthenticated, signIn, signOut, signUp }}>
      { children }
    </AuthContext.Provider>
  )
}