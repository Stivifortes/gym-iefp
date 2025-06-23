import { useState } from 'react';
import Logo from '../../assets/Logo.png';
import { registerUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Registro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    endereco: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.endereco.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    try {
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        phone: form.phone,
        endereco: form.endereco,
      });

      console.log('Resposta do backend:', data);

      setMensagem('Conta criada com sucesso!');
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        endereco: '',
      });
      navigate('/login');
    } catch (error) {
      setMensagem(error.message || 'Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <img src={Logo} alt="Logo" className="registro-logo" />
        <h2 className="registro-titulo">Criar uma conta</h2>
        <p className="registro-subtitulo">
          Introduz os seus dados para criar uma conta
        </p>

        {mensagem && (
          <div
            className="error-message"
            style={{
              color:
                mensagem === 'Conta criada com sucesso!'
                  ? '#28a745'
                  : '#dc3545',
              backgroundColor:
                mensagem === 'Conta criada com sucesso!'
                  ? '#d4edda'
                  : '#f8d7da',
              border:
                mensagem === 'Conta criada com sucesso!'
                  ? '1px solid #c3e6cb'
                  : '1px solid #f5c6cb',
              borderRadius: '4px',
              padding: '10px',
              marginBottom: '15px',
              fontSize: '14px',
            }}>
            {mensagem}
          </div>
        )}

        <form className="registro-form" onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            className="registro-input"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Email@example.com"
            className="registro-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Telefone</label>
          <input
            type="tel"
            name="phone"
            placeholder="000000"
            className="registro-input"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="registro-input"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirmar password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar password"
            className="registro-input"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>Endereço</label>
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            className="registro-input"
            value={form.endereco}
            onChange={handleChange}
            required
          />

          <button type="submit" className="registro-botao">
            Criar Conta
          </button>
        </form>

        <p className="registro-login">
          Já tem uma conta? <a href="/login">Iniciar sessão</a>
        </p>
      </div>
    </div>
  );
};

export default Registro;
