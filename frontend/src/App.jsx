import './App.css'
import ReactDOM from "react-dom/client";
import AppRoutes from './router';

export default function App() {

  return (
     <AppRoutes/>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
