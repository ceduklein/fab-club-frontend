import { useState } from 'react';
import Head from "next/head";
import { parseCookies } from "nookies";

import styles from './style.module.scss';

import { Card } from "@/components/Card";
import { NavBar } from "@/components/NavBar";
import { Table } from '@/components/Table';
import { Modal } from '@/components/Modal';

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupApiClient } from "@/services/api";
import { handleDoCard, handleSendCard } from './service';

export default function CardRequests({ users, admin_id }) {
  const api = setupApiClient();

  const [usersList, setUsersList] = useState(users);
  const [editedUser, setEditedUser] = useState({});
  const [showDoCardModal, setShowDoCardModal] = useState(false);
  const [showSendCardModal, setShowSendCardModal] = useState(false);

  const handleCloseModal = () => {
    setShowDoCardModal(false);
    setShowSendCardModal(false);
  }

  const handleShowDoCardModal = (u) => {
    setEditedUser(u);
    setShowDoCardModal(true);
  }

  const handleShowSendCardModal = (u) => {
    setEditedUser(u);
    setShowSendCardModal(true);
  }

  const callHandleDoCard = async () => {
    const newList = await handleDoCard(editedUser.id, admin_id);
    setUsersList(newList);
    handleCloseModal();
  }

  const callHandleSendCard = async () => {
    const newList = await handleSendCard(editedUser.id, admin_id);
    setUsersList(newList);
    handleCloseModal();
  }

  const elementsModal = () => {
    return(
      <p>{ showDoCardModal ? `Confirma a emissão da carteirinha para o usuário abaixo?` : 
        `Confirma o envio da carteirinha para o usuário abaixo?`}<br />
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
        <div className={styles.containerList} >
          <Card title='Solicitações Pendentes'>
            <Table data={usersList} onClickDo={handleShowDoCardModal} 
              onClickSend={handleShowSendCardModal} />
          </Card>

          <Modal title='Emissão de Carteirinha' closeDialog={handleCloseModal}
            showDialog={showDoCardModal} showChildren={true} onConfirm={callHandleDoCard}
            confirmButtonText='Sim' closeButtonText='Não' >
              { elementsModal() }
          </Modal>

          <Modal title='Envio de Carteirinha' closeDialog={handleCloseModal}
            showDialog={showSendCardModal} showChildren={true} onConfirm={callHandleSendCard}
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
  const response = await api.get(`/usuarios/pendentes`, { params: { admin_id: id } });

  return { props: { users: response.data, admin_id: id } }
});
