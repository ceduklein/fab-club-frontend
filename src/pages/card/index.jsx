import Head from "next/head";
import Image from "next/image";
import { parseCookies } from "nookies";
import { FiArrowLeftCircle, FiDownload } from "react-icons/fi";

import styles from './style.module.scss';
import logoM from '../../../public/logoM.png';

import { setupApiClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/Card";
import { formatDate } from "@/utils/formatDate";

export default function UserCard({ user }) {
  const loggedUser = user;

  const formatedBirthDate = formatDate(loggedUser.dataNascimento);
  const formatedDate = formatDate(loggedUser.created_at);

  return(
    <>
      <Head>
        <title>Fã Clube - Lista de Usuários</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerCard} >
          <Card title='Carteirinha Fã Clube'>
            { !loggedUser.carteirinhaEmitida & !loggedUser.carteirinhaEnviada ? (
              <div className={styles.cardText}>
                <p>Recebemos sua solicitação. Em breve sua carteirinha estará disponível. Favor aguardar.</p>
                <a className="btn btn-danger" href="/" 
                style={{fontSize: '1rem', width: '15%'}}>
                  <FiArrowLeftCircle size={20} style={{ marginTop: '-5px' }} /> Voltar
                </a>
              </div>
            ) : (
              <div className={styles.card}>
                <div className={styles.cardBox}>
                  <div className={styles.cardLogo}></div>
                    <Image src={logoM} className={styles.cardLogoImg} alt="logo" />
                  
                  <div className={styles.cardBody}>
                    <p>Id: { loggedUser.id }</p>
                    <p>{ loggedUser.nome }</p>
                    <p>Data de nascimento: { formatedBirthDate }</p>
                    <p>Data de inscrição: { formatedDate }</p>
                  </div>

                </div>

                <a className="btn btn-primary" type="button" onClick={ () => { } } 
                style={{fontSize: '1rem'}}>
                  <FiDownload size={20} style={{ marginTop: '-5px' }} /> Download
                </a>
              </div>
            )}

          </Card>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
  const api = setupApiClient(ctx);
  const { '@auth.userId': id } = parseCookies(ctx);
  const response = await api.get(`/usuarios/${id}`);

  return { props: { user: response.data } }
});