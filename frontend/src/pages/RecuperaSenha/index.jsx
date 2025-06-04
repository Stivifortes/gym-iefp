import './RecuperaSenha.css';
import Logo from '../../assets/LoginLogo.png';

export default function RecuperaSenha() {
  return (
    <div className="recupera-container">
      <div className="recupera-box">
        <img alt="Logo" src={Logo} className="logo" />
        <h2 className="titulo">Redefinição de senha</h2>
        <h3 className="subtitulo">Preencha os campos abaixo</h3>

        <form className="formulario">
          <div className="campo">
            <label htmlFor="email">Digite sua nova senha</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="campo">
            <label htmlFor="password">Confira sua nova senha</label>
            <input id="password" name="password" type="password" required />
          </div>

          <button type="submit" className="botao">
            Redefinir senha
          </button>
        </form>
      </div>
    </div>
  );
}
