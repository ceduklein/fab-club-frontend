import { FaDeezer, FaMusic, FaNapster, FaSpotify } from 'react-icons/fa';
import { Accordion, AccordionTab } from 'primereact/accordion';

import styles from './style.module.scss';

export function Biografia() {
  return(
    <div className={styles.biografia}>
      <p>
        Responsáveis por algumas das levadas mais animadas do sertanejo universitário, como “Pode Sorrir", “Voa Cacatua”, “Tranqueira”, “A Hora já Passou”, “Agitei”, “Chora mas Não me Liga”, entre outras, os catarinenses Fulano & Beltrano, da cidade de Florianópolis, ganharam projeção nacional e, hoje, são considerados uma das principais duplas do Brasil
      </p>
      <p>
        A dupla resolveu então gravar um CD independente, na garagem da casa de Fulano, com algumas composições próprias e novas roupagens de clássicos da música sertaneja. O repertório agradou e a agenda de apresentações aumentou. Em 2007 nascia o primeiro trabalho, o CD/DVD “Ao Vivo Em Floripa”, pela gravadora Ixtepô Music.
      </p>
      <p>
        A repercussão do “Ao Vivo Em Floripa", foi tão imediata que a dupla além de ver o seu primeiro grande sucesso, a canção “Pode Sorrir", estourar por todo o Brasil, ganhou disco de ouro com o trabalho e assim, a história de Fulano & Beltrano foi se construindo.
      </p>
      <p>
        Em 2008 veio mais uma surpresa agradável: a música “De Tanto Te Intizicar”, também do CD “Ao Vivo Em Floripa”, foi escolhida para ser trilha sonora da novela global "Não me Atazana". A canção passou a fazer parte da programação de quase todas as rádios brasileiras.`
      </p>
    </div>
  )
}

export function Discografia() {
  return(
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Ao Vivo em Floripa 
        <div className={styles.icons}>
          <FaSpotify color='green'/>
          <FaMusic color='#FB4C63' />
          <FaNapster />
          <FaDeezer />
        </div>
        <span class="badge bg-primary rounded-pill">2007</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Sofrecência Infinita
        <div className={styles.icons}>
          <FaSpotify color='green'/>
          <FaMusic color='#FB4C63' />
          <FaNapster />
          <FaDeezer />
        </div>
        <span class="badge bg-primary rounded-pill">2009</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        No Banco Redondo
        <div className={styles.icons}>
          <FaSpotify color='green'/>
          <FaMusic color='#FB4C63' />
          <FaNapster />
          <FaDeezer />
        </div>
        <span class="badge bg-primary rounded-pill">2010</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Para Sempre Tainha
        <div className={styles.icons}>
          <FaSpotify color='green'/>
          <FaMusic color='#FB4C63' />
          <FaNapster />
          <FaDeezer />
        </div>
        <span class="badge bg-primary rounded-pill">2013</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Live in Paulo Lopes!
        <div className={styles.icons}>
          <FaSpotify color='green'/>
          <FaMusic color='#FB4C63' />
          <FaNapster />
          <FaDeezer />
        </div>
        <span class="badge bg-primary rounded-pill">2018</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Acústico -- 15 Anos
        <div className={styles.icons}>
          <FaSpotify color='green'/>
          <FaMusic color='#FB4C63' />
          <FaNapster />
          <FaDeezer />
        </div>
        <span class="badge bg-primary rounded-pill">2022</span>
      </li>
    </ul>
  )
}

export function Agenda() {
  return(
    <Accordion activeIndex={0}>
      <AccordionTab header="07/07/2023 - Florianópolis/SC">
        <p className="m-0">Local: P12 - Jurerê Internacional</p>
        <p className="m-0">Início: 19:00</p>
      </AccordionTab>
      <AccordionTab header="08/07/2023 - Balneário Camboriú/SC">
        <p className="m-0">Local: Music Park BC</p>
        <p className="m-0">Início: 23:30</p>
      </AccordionTab>
      <AccordionTab header="11/07/2023 - Joinville/SC">
        <p className="m-0">Local: Joinville Square Garden</p>
        <p className="m-0">Início: 22:00</p>
      </AccordionTab>
      <AccordionTab header="13/07/2023 - Curitiba/PR">
        <p className="m-0">Local: Shed Bar Curitiba</p>
        <p className="m-0">Início: 23:00</p>
      </AccordionTab>
      <AccordionTab header="19/07/2023 - Porto Alegre/RS">
        <p className="m-0">Local: Auditório Araújo Vianna</p>
        <p className="m-0">Início: 22:00</p>
      </AccordionTab>
      <AccordionTab header="26/07/2023 - Brasília/DF">
        <p className="m-0">Local: Estacionamento da Arena BRB</p>
        <p className="m-0">Início: 23:45</p>
      </AccordionTab>
    </Accordion>
  )
}