import React from 'react';
import { Link } from 'react-router-dom';
import '../MenuLateral/styles.css';
import { IoHome, IoPerson } from "react-icons/io5";
import { PiSquaresFourFill } from "react-icons/pi";
import { FaThLarge, FaClipboardList, FaUsers   } from 'react-icons/fa';
import Black from '../Img/Black1.png';

function MenuLateral({ isLoggedIn }) {
  return (
      <div className='container'>
        <img src={Black} alt="" width={100}/>

      <nav>
        <ul className='menu'> 
          <li>
            <Link className='link'  to="/"><IoHome /> Home</Link>
          </li>
          <li>
            <Link className='link' to="/perfil"><IoPerson /> Perfil</Link>
          </li>
          <li>
            <Link className='link active' to="/planos"><PiSquaresFourFill  /> Planos</Link>
          </li>
          <li>
            <Link className='link' to="/inscricoes"><FaClipboardList  /> Inscrições</Link>
          </li>
          <li>
            <Link className='link' to="/utilizadores"><FaUsers  /> Utilizadores</Link>
          </li>
          <li>
            <Link className='link' to="/dashboard"><FaThLarge /> Dashboard</Link>
          </li>
        </ul>
      </nav>
      {isLoggedIn ? (
        <button>
          <Link className='link' to="/login">Logout</Link>
        </button>
      ) : (
        <button>
          <Link className='link' to="/login">Login</Link>
        </button>
      )}
      </div>

  );
}
export default MenuLateral;
