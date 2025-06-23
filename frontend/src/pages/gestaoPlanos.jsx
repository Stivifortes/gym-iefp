import React from "react";
import { useState } from "react";
import AddNewPlano from "./modal";
import Modal from "../components/Modal";
export default function PlanosTable() {
  const [Planos, setPlanoSelecionado] = useState([]);
  const [EditarPlano, setEditarPlano] = useState(null);
  const [ExcluirPlano, setExcluirPlano] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [name,setName] = useState('');
  const [duration,setDuration] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState('');
  
  const planos = [
    {
      id: "#00033",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#00333",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#26426",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#42466",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#52466",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#60466",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#70466",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
  ];
  const handleEditarPlano = (id) => {
    const plano = Planos.find((plano) => plano.id === id);
    if(plano){
      setPlanoSelecionado(plano);
      setEditarPlano(true);
    }
  }
  
  function handleCreatePlano() {
    console.log("criar");
  }
  const CreateModalContent = () => (
    <>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nome do Plano"
      />
      <input
        type="text"
        name="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Duração"
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Descrição"
        rows="5"
      ></textarea>
      <input
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Preço"
      />
      <input
        type="text"
        name="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Imagem do Plano"
      />
    </>
  );
  return (
    <div className="p-50">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOpenCreateModal(!openCreateModal)}
      >
        Criar Novo Plano
      </button>
      <div className="rounded-lg bg-white overflow-hidden shadow border border-gray-200 m-4">
        <h2 className="text-lg font-semibold bg-gray-100 px-6 py-4 divide-y divide-gray-200">
          Gerenciamento de Planos
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Id</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Duração</th>
              <th className="px-6 py-3">Descrição</th>
              <th className="px-6 py-3">Preço</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-sm">
            {planos.map((plano, index) => (
              <tr key={plano.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{plano.id}</td>
                <td className="px-6 py-4">{plano.nome}</td>
                <td className="px-6 py-4">{plano.duracao}</td>
                <td className="px-6 py-4">{plano.descricao}</td>
                <td className="px-6 py-4">{plano.preco}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    onClick={() => handleEditarPlano(plano)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    onClick={() => {
                      setExcluirPlano(true);
                      setPlanoSelecionado(plano);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openCreateModal && (
        <Modal
          title="Criar Novo Plano"
          cancelButtonText={"Cancelar"}
          confirmButtonText={"Criar"}
          children={<CreateModalContent />}
          setOpen={setOpenCreateModal}
          confirmButtonOnClick={handleCreatePlano}
        />
      )}
    </div>
  );
}
