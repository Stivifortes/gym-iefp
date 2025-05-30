import Logo from '../../assets/Logo.png';
import './style.css';

const Registro = () => {
  return (
    <div className="registro-container">
      <div className="registro-box">
        <img src={Logo} alt="Logo" 
        className="registro-logo" 
        />
        <h2 className="registro-titulo">Criar uma conta</h2>
        <p className="registro-subtitulo">Introduz os seus dados para criar uma conta</p>

        <form className="registro-form">
          <label>Nome</label>
          <input type="text" 
          placeholder="Nome completo" 
          className="registro-input" 
          />

          <label>E-mail</label>
          <input type="email" 
          placeholder="Email@example.com" 
          className="registro-input" 
          />

          <label>Telefone</label>
          <input type="tel" 
          placeholder="000000" 
          className="registro-input" 
          />

          <label>Password</label>
          <input type="password" 
          placeholder="Password" 
          className="registro-input" 
          />

          <label>Confirmar password</label>
          <input type="password" 
          placeholder="Confirmar password" 
          className="registro-input" 
          />

          <label>Endereço</label>
          <input type="text" 
          placeholder="Endereço" 
          className="registro-input" 
          />

          <button type="submit" className="registro-botao">Criar Conta</button>
        </form>

        <p className="registro-login">Ja tem uma conta ? <a href="/login">Iniciar sessão</a></p>
      </div>
    </div>
  );
};

export default Registro;