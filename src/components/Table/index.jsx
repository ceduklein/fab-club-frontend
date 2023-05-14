import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { FaIdCard, FaEdit, FaSearch } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { MdAdminPanelSettings } from 'react-icons/md';

import styles from './style.module.scss';

export function Table(props) {

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return(
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <FaSearch />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
        </span>
      </div>
    )
  }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const header = renderHeader();

  const actionButtons = (rowData) => {
    const emitida = rowData.carteirinhaEmitida;
    const enviada = rowData.carteirinhaEnviada;

    return (
      <div className={styles.actionButtons}>
        <button type='button' disabled={emitida} title="Emitir Carteirinha"
          onClick={e => props.onClickDo(rowData)} className="btn btn-info" >
          <FaIdCard size={17}/>
        </button>
        <button type='button' className="btn btn-success" disabled={enviada}
          title="Enviar Carteirinha" onClick={e => props.onClickSend(rowData)} >
          <BiMailSend size={18}/>
        </button>
        <button type='button' className="btn btn-warning"
          title="Editar Credenciais" onClick={e => props.onClickEdit(rowData)} >
          <FaEdit size={18}/>
        </button>
      </div>
    )
  }

  const infoIcons = (rowdata) => {
    return (
      <div className={styles.icons}>
        { rowdata.admin && (
          <MdAdminPanelSettings size={25} color='#Fb4c63' title="Usuário Administrador" />
        ) }

        { rowdata.carteirinhaEmitida && (
          <FaIdCard size={25} color='green' title="Carteirinha Emitida" />
        ) }

        { rowdata.carteirinhaEnviada && (
          <BiMailSend size={25} color="black" title="Carteirinha Enviada" />
        ) }  
      </div>
    )
  }

  return(
    <DataTable value={props.data} header={header} dataKey='id' 
      className='p-datatable-sm p-datatable-striped'
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      columnResizeMode="fit"
      removableSort
      resizableColumns
      filterDisplay="row" filters={filters}
      globalFilterFields={['id', 'nome']}
      paginator rows={10} rowsPerPageOptions={[10,20,30,40,50]} >
      
      <Column field='id' header="Id" />

      <Column field='nome' header="Nome" />

      <Column field='telefone' header="Telefone" />

      <Column body={infoIcons} field='situacao' header="Situação" />

      <Column body={actionButtons} field='acao' header="Ações" />   

    </DataTable>
  )
}