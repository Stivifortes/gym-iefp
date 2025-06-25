import React from 'react';
import './style.css';
import TopBar from '../../components/TopBar/index';
import logo from '../../assets/Logo.png';
// import Sidebar from '../../components/Sidebar';

const Planos = () => {
  return (
    <div className="plan-details-container">
      {/* <Sidebar /> */}

      <div className="plan-main">
        <TopBar />

        <div className="plan-box">
          <div className="plan-logo">
            <img src={logo} alt="Logo" />
          </div>

          <h2 className="plan-title">Plano Escolhido</h2>

          <div className="plan-info-box">
            <div className="plan-info">
              <div>
                <span className="bold">Nome: </span>
                <span>Mensal</span> <span className="bold"> </span>
                <span>Standart</span>
              </div>

              <div>
                <span className="bold">Data de Inicio: </span>
                <span>25/04/25</span>
              </div>

              <div>
                <span className="bold">Data de Fim: </span>
                <span>27/04/25</span>
              </div>

              <div>
                <span className="bold">Status: </span>
                <span>Pendente</span>
              </div>
            </div>

            <div className="plan-image">
              {/* <img src="#" alt="Plan Image" /> */}
            </div>
          </div>

          <div className="plan-message">
            <p>O plano está aguardando aprovação do administrador!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;
