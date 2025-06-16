import './App.css';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import MenuLateral from './components/MenuLateral';
import AppRoutes from './router';

export default function App() {
  return <AppRoutes />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
