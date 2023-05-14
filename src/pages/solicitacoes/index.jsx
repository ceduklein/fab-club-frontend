import Head from "next/head";

import styles from './style.module.scss';

import { Card } from "@/components/Card";
import { NavBar } from "@/components/NavBar";

export default function Users() {

  return(
    <>
      <Head>
        <title>Fã Clube - Solicitações Pendentes</title>
      </Head>
      <NavBar />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div className={styles.containerList} >
          <Card title="Solicitações Pendentes">

          </Card>
        </div>
      </div>
    </>
  )
}