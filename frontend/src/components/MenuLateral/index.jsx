import { Link } from 'react-router-dom';
import React from 'react';
import Black from "../Img/Black1.png"
const MenuLateral = () => {
  return (
    <>
    <img src={Black} height={50}/>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/perfil">Perfil</Link>
          </li>
          <li>
            <Link to="/planos">Planos</Link>
          </li>
          <li>
            <Link to="/inscricoes">Inscricoes</Link>
          </li>
          <li>
            <Link to="/utilizadores">Utilizadores</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <button>
            <Link to="/login">Logout</Link>
      </button>
    </>
  );
};

export default MenuLateral;
