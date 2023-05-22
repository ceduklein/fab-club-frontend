import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { FiLogOut } from 'react-icons/fi'

import { setupApiClient } from '@/services/api';
import { signOut } from '@/context/AuthContext'

export function NavBar() {
  const api = setupApiClient();

  const handleSignOut = () => signOut();

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const { '@auth.userId': id } = parseCookies();
    
    async function fetchData() {
      const response = await api.get(`/usuarios/${id}`);
      
      const { admin } = response.data;
      setAdmin(admin);
    }
    fetchData();

  }, []);

  return(
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{marginLeft: '25%'}}>Fulano&Beltrano</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto" style={{marginLeft: '10%'}}>
            <li className="nav-item">
              <a className="nav-link" href="/">Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>

          {admin ? (
            <>
            <li className="nav-item" style={{marginLeft: '10%'}}>
              <a className="nav-link" href="/users">Usuários
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item" style={{marginLeft: '10%'}}>
              <a className="nav-link" href="/card-requests">Solicitações</a>
            </li>
            </>

          ) : (

            <>
            <li className="nav-item" style={{marginLeft: '10%'}}>
              <a className="nav-link" href="/user-details">Conta
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item" style={{marginLeft: '10%'}}>
              <a className="nav-link" href="#">Carteirinha</a>
            </li>
            </>
          
        )}
            
            <li className="nav-item" style={{marginLeft: '60%'}}>
              <a className="nav-link" type='button' onClick={handleSignOut}>
                <FiLogOut size={22} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}