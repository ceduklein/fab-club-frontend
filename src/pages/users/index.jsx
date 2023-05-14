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

export default function Users({ users, admin_id }) {
  const [usersList, setUsersList] = useState(users);
  const [editedUser, setEditedUser] = useState({});

  const [showDoCardModal, setShowDoCardModal] = useState(false);
  const [showSendCardModal, setShowSendCardModal] = useState(false);
  const [msg, setMsg] = useState('');

  const handleCloseModal = () => {
    setShowDoCardModal(false);
    setShowSendCardModal(false);
  }

  const handleShowDoCardModal = (u) => {
    setEditedUser(u);
    setShowDoCardModal(true);
  }

  const elementsModal = () => {
    return(
      <p>Confirma a emissão de carteirinha para o usuário abaixo?<br />
        <strong>Id: { editedUser.id } <br />Nome: { editedUser.nome }</strong></p>
    )
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
            <Table data={usersList} onClickDo={handleShowDoCardModal} />
          </Card>

          <Modal content={msg} title='Emissão de Carteirinha' closeDialog={handleCloseModal}
            showDialog={showDoCardModal} showChildren={true}
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

  return {
    props: {
      users: response.data,
      admin_id: id
    }
  }
})