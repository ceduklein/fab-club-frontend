import { Dialog } from 'primereact/dialog';
import { FiAlertCircle } from 'react-icons/fi';

export function Modal(props) {
  const { title, content, showDialog, closeDialog, onConfirm, showChildren, confirmButtonText, closeButtonText } = props;

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
        <FiAlertCircle size={30} color={'red'} style={{marginRight: 20}} />
        { title }
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        <button type="button" className="btn btn-info" onClick={ e => onConfirm() }>
          { confirmButtonText }
        </button>
        <button type="button" className="btn btn-danger" onClick={ closeDialog }>
          { closeButtonText }
        </button>
      </div>
    )
  }

  return(
    <div className="card flex justify-content-center">
      <Dialog header={ dialogHeader } 
        visible={ showDialog } 
        style={{ width: '50vw' }} 
        onHide={ closeDialog } 
        footer={ dialogFooter }
      >  
        { showChildren ? props.children : content }
      </Dialog>
  </div>
  )
}