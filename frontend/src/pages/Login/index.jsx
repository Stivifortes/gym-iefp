import logo from '../../assets/LoginLogo.png';
import './style.css';

const Login = () => {
  return (
    <div className="generalContainer">
      <div className="signUpContainer">
        <div className="top">
          <img src={logo} className="logo" alt="Logo" />
          <h2 className="title">Login</h2>
          <p className="topText">Inicie sessão na sua conta</p>
        </div>

        <form className="formContainer">
          <div className="inputGroup">
            <div className="inputField">
              <label className="label">Email</label>
              <input type="email" placeholder="Your email" className="input" />
            </div>

            <div className="inputField">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
              />
            </div>

            <label className="remember">
              <p>Lembrar-me</p>
              <input placeholder="Lembre-me" type="checkbox" />
            </label>
          </div>

          <button type="submit" className="signUpButton">
            Iniciar sessão
          </button>

          <p className="signInText">
            Você não tem conta?{' '}
            <a href="#" className="signInLink">
              Criar conta
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
