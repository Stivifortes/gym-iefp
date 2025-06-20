import { useState } from 'react';
import Logo from '../../assets/Logo.png';
import './style.css';

const Registro = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

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

    // Validação simples no frontend
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
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      console.log('Resposta do backend:', data); // Para debug

      if (response.ok) {
        setMensagem('Conta criada com sucesso!');
        // Limpar campos após sucesso:
        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          endereco: '',
        });
      } else {
        setMensagem(data.error || 'Erro no registro');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor');
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

        {mensagem && <p style={{ color: 'red', marginBottom: '1rem' }}>{mensagem}</p>}

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
