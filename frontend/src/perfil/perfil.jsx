import { useAuth } from '../hooks/useAuth.jsx';
import LogoutButton from '../components/LogoutButton';

export function Perfil() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Bem-vindo, {user?.name || 'Usuário'}!</h2>
      <p>Email: {user?.email}</p>
      <p>Telefone: {user?.phone}</p>
      <p>Endereço: {user?.endereco}</p>
      <LogoutButton>Sair</LogoutButton>
    </div>
  );
}

export default Perfil;
