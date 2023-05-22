import { useState, useContext } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { toast } from 'react-toastify';

import styles from '../styles/Home.module.scss';

import logoImg from '../../public/logo.png';
import { Card } from "@/components/Card";
import { FormGroup } from "@/components/FormGroup";

import { AuthContext } from '@/context/AuthContext';
import { canSSRGuest } from '@/utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning('Preencha todos os campos.');
      return;
    }
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
              <FormGroup label="Email: " type="email" for="inputEmail" 
                placeholder="Digite seu email" id="inputEmail"
                value={email} onChange={ e => setEmail(e.target.value) } />

              <FormGroup label="Senha: " type="password" for="inputPassword" 
                placeholder="Sua senha" id="inputPassword"
                value={password} onChange={ e => setPassword(e.target.value) } />

              <button className='btn btn-info' type='submit' style={{ width: '100%'}}>
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

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return { props: {} }
});