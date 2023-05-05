import { useState, useContext } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';

import styles from '../styles/Home.module.scss';

import logoImg from '../../public/logo.svg';
import { Card } from "@/components/Card";
import { FormGroup } from "@/components/FormGroup";

import { AuthContext } from '@/context/AuthContext';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    await signIn(email, password);
  }

  return (
    <>
      <Head>
        <title>Fã Clube - Faça seu login</title>
      </Head>

      
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerLogin} >
          <Image alt="Logo Fulano&Beltrano" src={logoImg}/>

          <Card title="Login">
            <form onSubmit={handleLogin}>
              <FormGroup label="Email: "
                type="email"
                for="inputEmail" 
                placeholder="Digite seu email"
                id="inputEmail"
                value={email}
                onChange={ e => setEmail(e.target.value) }
              />

              <FormGroup label="Senha: "
                type="password"
                for="inputPassword" 
                placeholder="Sua senha"
                id="inputPassword"
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />

              <button className='btn btn-success'
                type='submit' style={{ width: '100%'}}>
                  Acessar
              </button>

              <div className='link'>
                <Link className={styles.link} href='/signup'>Não possui uma conta? Cadastre-se</Link>
              </div>

            </form>
          </Card>
        </div>
      </div>
    </>




  )
}
