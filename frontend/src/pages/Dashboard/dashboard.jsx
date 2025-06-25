import React from 'react';
import './style.css';

// 📊 Importa os componentes do gráfico
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// 🟦 Componente para os cards
function CardInfo({ nome, usuarios, percentual }) {
  return (
    <div className="card">
      <h2>{nome}</h2>
      <p>Usuários: <span>{usuarios}</span></p>
      <p>Percentual: <span>{percentual}</span></p>
    </div>
  );
}

export default function Dashboard() {
  const planos = [
    { nome: "Plano Semanal", usuarios: 100, percentual: "10%" },
    { nome: "Plano Mensal", usuarios: 700, percentual: "70%" },
    { nome: "Plano Trimestral", usuarios: 200, percentual: "20%" }
  ];

  const pagamentos = {
    valores: [800, 150, 50],
    labels: ["Pagos", "Pendentes", "Isentos"],
    percentuais: ["80%", "15%", "5%"]
  };

  const usuarios = [
    { id: '00033', nome: 'Geremy Gomes Dos Santos', data: '12/09/2025', hora: '08:33', plano: 'Plano Semanal', status: 'Pago', valor: '500$' },
    { id: '00333', nome: 'Geremy Gomes Dos Santos', data: '12/09/2025', hora: '08:33', plano: 'Plano Mensal', status: 'Pendente', valor: '2000$' },
    { id: '26426', nome: 'Geremy Gomes Dos Santos', data: '12/09/2025', hora: '08:33', plano: 'Plano Mensal', status: 'Pendente', valor: '2000$' },
    { id: '42466', nome: 'Geremy Gomes Dos Santos', data: '12/09/2025', hora: '08:33', plano: 'Plano Semanal', status: 'Pago', valor: '500$' },
    { id: '04433', nome: 'Geremy Gomes Dos Santos', data: '12/09/2025', hora: '08:33', plano: 'Plano Trimestral', status: 'Pago', valor: '6000$' },
    { id: '00344', nome: 'Geremy Gomes Dos Santos', data: '12/09/2025', hora: '08:33', plano: 'Plano Semanal', status: 'Pago', valor: '500$' }
  ];

  const dadosGraficoLinha = [
    { mes: 'Jan', usuarios: 30 },
    { mes: 'Fev', usuarios: 40 },
    { mes: 'Mar', usuarios: 35 },
    { mes: 'Abr', usuarios: 60 },
    { mes: 'Mai', usuarios: 50 },
    { mes: 'Jun', usuarios: 55 },
    { mes: 'Jul', usuarios: 45 },
    { mes: 'Ago', usuarios: 60 },
    { mes: 'Set', usuarios: 40 },
    { mes: 'Out', usuarios: 50 },
    { mes: 'Nov', usuarios: 55 },
    { mes: 'Dez', usuarios: 50 }
  ];

  const dadosGraficoBarras = pagamentos.labels.map((label, i) => ({
    categoria: label,
    valor: pagamentos.valores[i]
  }));

  return (
    <div className="dashboard">
      
      <div className="cards">
        <div className="card">
          <h2>Total Usuários</h2>
          <p>Usuários: <span>1000</span></p>
          <p>Pendentes: <span>53</span></p>
        </div>

        {planos.map((plano, index) => (
          <CardInfo
            key={index}
            nome={plano.nome}
            usuarios={plano.usuarios}
            percentual={plano.percentual}
          />
        ))}
      </div>

      <div className="divider"></div>

      <div className="payment-stats">
        <h3>Estatística de Pagamento</h3>

        <div className="stats-circles">
          {pagamentos.labels.map((label, i) => (
            <div key={i} className="circle">
              <h4>{pagamentos.valores[i]}</h4>
              <p>{label}</p>
              <span>{pagamentos.percentuais[i]}</span>
            </div>
          ))}
        </div>

        {/* ✅ Novo gráfico de barras substituindo o antigo CSS */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={dadosGraficoBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#28a745" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="divider"></div>

      <div className="user-table">
        <h3>Gerenciamento de Usuários</h3>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>Nome</th>
              <th>Data Inscrição</th>
              <th>Plano</th>
              <th>Status</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>#{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.data} | {user.hora}</td>
                <td>{user.plano}</td>
                <td className={`status ${user.status.toLowerCase()}`}>{user.status}</td>
                <td>{user.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider"></div>

    </div>
  );
}
