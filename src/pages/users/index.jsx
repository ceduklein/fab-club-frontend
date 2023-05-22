import { useState } from 'react';
import Head from "next/head";
import { parseCookies } from "nookies";

import styles from './style.module.scss';

import { Card } from "@/components/Card";
import { NavBar } from "@/components/NavBar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupApiClient } from "@/services/api";
import { Table } from '@/components/Table';
import { Modal } from '@/components/Modal';
import { toast } from 'react-toastify';

export default function Users({ users, admin_id }) {
  const [usersList, setUsersList] = useState(users);
  const [editedUser, setEditedUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (u) => {
    setEditedUser(u);
    setShowModal(true);
  }

  const elementsModal = () => {
    return(
      <p>{ !editedUser.admin ? `Conceder permissões de administrador para o usuário abaixo?` : 
      `Remover permissões de admnistrador para o usuário abaixo?` }<br />
        <strong>Id: { editedUser.id } <br />Nome: { editedUser.nome }</strong></p>
    )
  }

  const handleChangeCredentials = async () => {
    const api = setupApiClient();
    try {
      await api.patch(`/usuarios/permissoes/${editedUser.id}`, { admin_id });

      const response = await api.get(`/usuarios`, { params: { admin_id } });
      setUsersList(response.data);
      
      toast.success('Credencial alterada.');
      handleCloseModal();
    } catch (err) {
      console.log(err);
      toast.error('Erro ao alterar credencial.');
      handleCloseModal();
    }
  }

  return(
    <>
      <Head>
        <title>Fã Clube - Lista de Usuários</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerUsersList} >
          <Card title='Lista de Usuários'>
            <Table data={usersList} onClickEdit={handleShowModal} listUser={true} />
          </Card>

          <Modal title='Alterar Credencial' closeDialog={handleCloseModal}
            showDialog={showModal} showChildren={true} onConfirm={handleChangeCredentials}
            confirmButtonText='Sim' closeButtonText='Não' >
              { elementsModal() }
          </Modal>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
  const api = setupApiClient(ctx);
  const { '@auth.userId': id } = parseCookies(ctx);
  const response = await api.get(`/usuarios`, { params: { admin_id: id } });

  return { props: { users: response.data, admin_id: id } }
});
