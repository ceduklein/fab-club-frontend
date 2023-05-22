import { useState } from "react";
import Head from "next/head";
import { FiArrowLeftCircle, FiSave, FiTrash2 } from 'react-icons/fi';
import { TbArrowsExchange } from 'react-icons/tb';
import { parseCookies } from 'nookies';

import styles from './style.module.scss';

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupApiClient } from "@/services/api";

import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/Card";
import { FormGroup } from "@/components/FormGroup";
import { Modal } from "@/components/Modal";
import { handleChangePassword, handleDelete, handleUpdate } from "./services";

export default function UserDetails({ user }) {
  const [id, setId] = useState(user.id);
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [dataNascimento, setDataNascimento] = useState(user.dataNascimento);
  const [cpf, setCpf] = useState(user.cpf);
  const [telefone, setTelefone] = useState(user.telefone);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [showDialog, setShowDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const callHandleUpdate = (event) => {
    event.preventDefault();
    let data = { nome, email, telefone };
    handleUpdate(data, id);   
  }

  const callHandleDelete = () => handleDelete(id);

  const callHandleChangePassword = () => {
    let passwordData = { oldPassword, password, passwordConfirmation };
    handleChangePassword(passwordData, id);
  }

  const handleCloseDialog = () => setShowDialog(false);
  const handleClosePasswordDialog = () => setShowPasswordDialog(false);

  const contentModal = `Após confirmação, todos seus dados serão apagados e sua conta será excluída.`;
  
  return(
    <>
      <Head>
        <title>Fã Clube - Meus Dados</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerUserDetails} >
          <Card title="Meus Dados">
            <form onSubmit={ callHandleUpdate }>
              <FormGroup label="Id: "type="text" for="inputId" 
                id="inputId" value={id} disabled={true} onChange={ () => {} } />
              <FormGroup label="Nome: "type="text" for="inputNome"
                id="inputNome" value={nome} onChange={ e => setNome(e.target.value) } />
              <FormGroup label="Email: " type="email" for="inputEmail" 
                id="inputEmail" value={email} onChange={ e => setEmail(e.target.value) } />
              <FormGroup label="CPF: "type="text" for="inputCpf"
                id="inputCpf" value={cpf} disabled={true} onChange={ () => {} } />
              <FormGroup label="Telefone: "type="text" for="inputTel"
                id="inputTel" value={telefone} onChange={ e => setTelefone(e.target.value) } />            
              <FormGroup label="Data de Nascimento: "type="date" for="inputData" placeholder=""
                id="inputData" value={dataNascimento} onChange={ () => {} } disabled={true} />
              <button className='btn btn-info'
                type='submit' style={{ width: '100%', fontSize: '1rem' }}>
                <FiSave size={20} /> Salvar Alterações
              </button>

              <div className={styles.footerButtons}>
                <a className="btn btn-secondary" href="/" 
                  style={{fontSize: '1rem', width: '30%'}}>
                  <FiArrowLeftCircle size={20} style={{ marginTop: '-5px' }} /> Voltar
                </a>
                <a className="btn btn-danger" type="button" onClick={ () => setShowDialog(true) }
                  style={{ fontSize: '1rem', width: '30%', marginLeft: '5%' }}>
                  <FiTrash2 size={20} style={{ marginTop: '-5px' }} /> Excluir Conta
                </a>
                <a className="btn btn-success" type="button" 
                  onClick={ () => setShowPasswordDialog(true) } 
                  style={{ fontSize: '1rem', marginLeft: '5%', width: '30%' }}>
                  <TbArrowsExchange size={20} style={{ marginTop: '-5px' }} /> Alterar Senha
                </a>
              </div>
            </form>
          </Card>

          <Modal content={ contentModal } title="Confirma a exclusão da conta?" 
            closeDialog={ handleCloseDialog } showDialog={ showDialog } 
            onConfirm={ callHandleDelete } confirmButtonText='Sim' closeButtonText='Não' />

          <Modal title="Favor preencher  todos os campos para alterar sua senha."
            closeDialog={ handleClosePasswordDialog } showChildren={ true }
            showDialog={ showPasswordDialog } onConfirm={ callHandleChangePassword }
            confirmButtonText='Alterar' closeButtonText='Cancelar' >
              <FormGroup label="Senta atual: "type="password" for="inputSat"
                id="inputSat" value={ oldPassword } 
                onChange={ e => setOldPassword(e.target.value) } />
              <FormGroup label="Nova senha: "type="password" for="inputSnv"
                id="inputSnv" value={ password } 
                onChange={ e => setPassword(e.target.value) } />
              <FormGroup label="Senta atual: "type="password" for="inputScf"
                id="inputScf" value={ passwordConfirmation } 
                onChange={ e => setPasswordConfirmation(e.target.value) } />
          </Modal>    
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);
  const { '@auth.userId': id } = parseCookies(ctx);
  const response = await api.get(`/usuarios/${id}`);

  return { props: { user: response.data } }
});
