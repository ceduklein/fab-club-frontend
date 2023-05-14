import { useState, useContext } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from './style.module.scss';
import logoImg from '../../../public/logo.png'

import { Card } from "@/components/Card";
import { FormGroup } from "@/components/FormGroup";
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSignUp = async(event) => {
    event.preventDefault();

    if(nome === '' || email === '' || password === '' || 
      cpf === '' || telefone === '' || dataNascimento === '') {
      toast.warning('Preencha todos os campos.');
      return;
    }

    let data = { nome, email, password, telefone, cpf, dataNascimento };
    await signUp(data);
  }

  return(
    <>
      <Head>
        <title>Fã Clube - Faça seu login</title>
      </Head>

      
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerSignUp} >
          <Image alt="Logo Fulano&Beltrano" src={logoImg}/>

          <Card title="Cadastro">
            <form onSubmit={handleSignUp} >
              <FormGroup label="Nome: "type="text" for="inputNome" placeholder="Digite seu nome"
                id="inputNome" value={nome} onChange={ e => setNome(e.target.value) } />

              <FormGroup label="Email: " type="email" for="inputEmail"  placeholder="Seu email"
                id="inputEmail" value={email} onChange={ e => setEmail(e.target.value) } />
              
              <FormGroup label="CPF: "type="text" for="inputCpf" placeholder="Seu CPF"
                id="inputCpf" value={cpf} onChange={ e => setCpf(e.target.value) } />

              <FormGroup label="Telefone: "type="text" for="inputTel" placeholder="Seu telefone"
                id="inputTel" value={telefone} onChange={ e => setTelefone(e.target.value) } />
              
              <FormGroup label="Data de Nascimento: "type="date" for="inputData" placeholder=""
                id="inputData" value={dataNascimento} onChange={ e => setDataNascimento(e.target.value) } />

              <FormGroup label="Senha: " type="password" for="inputPassword" placeholder="Sua senha"
                id="inputPassword" value={password} onChange={ e => setPassword(e.target.value) } />

              <button className='btn btn-info'
                type='submit' style={{ width: '100%'}}>
                  Cadastrar
              </button>

              <div className='link'>
                <Link className={styles.link} href='/'>Já é cadastrado? Volte para o login</Link>
              </div>

            </form>
          </Card>
        </div>
      </div>
    </>
  )
}