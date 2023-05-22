import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { TabPanel, TabView } from 'primereact/tabview';
import { parseCookies } from "nookies";

import styles from './style.module.scss';

import { canSSRAuth } from "@/utils/canSSRAuth"
import { setupApiClient } from "@/services/api";

import { NavBar } from "@/components/NavBar";
import logoImg from '../../../public/logo.png'
import { Card } from "@/components/Card";
import { Agenda, Biografia, Discografia } from "./conteudo";

export default function Dashboard({ user }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState(user.nome);

  const firstName = name.split(' ')[0];

  return(
    <>
      <Head>
        <title>Fã Clube - Dashboard</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerDashboard} >
          <Image alt="Logo Fulano&Beltrano" src={logoImg}/>
          <Card title={`Olá, ${ firstName }. Bem vinda(o) ao Fã Clube!`}>
            <TabView activeIndex={activeIndex} onTabChange={ e => setActiveIndex(e.index)}>
              <TabPanel header="Biografia">
                <Biografia />
              </TabPanel>
              <TabPanel header="Discografia">
                <Discografia />
              </TabPanel>
              <TabPanel header="Agenda">
                <Agenda />
              </TabPanel>
            </TabView>
          </Card>
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