import { useAuth } from '../hocks/index.jsx';
export function Perfil() {
  const { user, isAuthenticated, error, logout } = useAuth();

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!isAuthenticated) return <p>Carregando ou não autenticado...</p>;

  return (
    <div>
      <h2>Bem-vindo, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
      <p>Endereço: {user.endereco}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Perfil;