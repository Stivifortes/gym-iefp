import React, { useState } from "react";
import Modal from "../components/Modal";

export default function PlanosTable() {
  const [planos, setPlanos] = useState([
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
    {
      id: "#80466",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
    {
      id: "#90466",
      nome: "Geremy Gomes Dos Santos",
      duracao: "30 Dias",
      descricao: "#####",
      preco: "$$$$",
    },
  ]);

  const [selectedPlano, setSelectedPlano] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleCreate = () => {
    const novoPlano = {
      id: Math.random().toString(36).substr(2, 9),
      nome: name,
      duracao: duration,
      descricao: description,
      preco: price,
      imagem: image,
    };
    setPlanos([...planos, novoPlano]);
    resetForm();
    setOpenCreateModal(false);
  };

  const handleEdit = () => {
    const planosAtualizados = planos.map((plano) =>
      plano.id === selectedPlano.id
        ? { ...plano, nome: name, duracao: duration, descricao: description, preco: price, imagem: image }
        : plano
    );
    setPlanos(planosAtualizados);
    resetForm();
    setOpenEditModal(false);
  };

  const handleDelete = () => {
    const planosAtualizados = planos.filter((plano) => plano.id !== selectedPlano.id);
    setPlanos(planosAtualizados);
    setOpenDeleteModal(false);
  };

  const openEdit = (plano) => {
    setSelectedPlano(plano);
    setName(plano.nome);
    setDuration(plano.duracao);
    setDescription(plano.descricao);
    setPrice(plano.preco);
    setImage(plano.imagem || '');
    setOpenEditModal(true);
  };

  const openDelete = (plano) => {
    setSelectedPlano(plano);
    setOpenDeleteModal(true);
  };

  const resetForm = () => {
    setName('');
    setDuration('');
    setDescription('');
    setPrice('');
    setImage('');
    setSelectedPlano(null);
  };

  const PlanoForm = () => (
    <>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" className="border p-2 w-full mb-2 rounded" />
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duração" className="border p-2 w-full mb-2 rounded" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" className="border p-2 w-full mb-2 rounded" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" className="border p-2 w-full mb-2 rounded" />
    </>
  );

  return (
    <div className="p-6 bg-[#D3D3D3] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-lg">Gerenciamento de Planos</h1>
        <button
          onClick={() => setOpenCreateModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600"
        >
          Criar Novo Plano
        </button>
      </div>

      <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">No</th>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Nome</th>
            <th className="p-3 border-b">Duração</th>
            <th className="p-3 border-b">Descrição</th>
            <th className="p-3 border-b">Preço</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {planos.map((plano, index) => (
            <tr key={plano.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b">{plano.id}</td>
              <td className="p-3 border-b">{plano.nome}</td>
              <td className="p-3 border-b">{plano.duracao}</td>
              <td className="p-3 border-b">{plano.descricao}</td>
              <td className="p-3 border-b">{plano.preco}</td>
              <td className="p-3 border-b flex gap-2">
                <button onClick={() => openEdit(plano)} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Editar</button>
                <button onClick={() => openDelete(plano)} className="bg-gray-300 text-black px-3 py-1 rounded-full text-sm">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openCreateModal && (
        <Modal
          title="Criar Plano"
          setOpen={setOpenCreateModal}
          confirmButtonText="Criar"
          cancelButtonText="Cancelar"
          confirmButtonOnClick={handleCreate}
        >
          <PlanoForm />
        </Modal>
      )}

      {openEditModal && (
        <Modal
          title="Editar Plano"
          setOpen={setOpenEditModal}
          confirmButtonText="Salvar"
          cancelButtonText="Cancelar"
          confirmButtonOnClick={handleEdit}
        >
          <PlanoForm />
        </Modal>
      )}

      {openDeleteModal && (
        <Modal
          title="Excluir Plano"
          setOpen={setOpenDeleteModal}
          confirmButtonText="Confirmar"
          cancelButtonText="Cancelar"
          confirmButtonOnClick={handleDelete}
        >
          <p>Tem certeza que deseja excluir o plano "{selectedPlano?.nome}"?</p>

        </Modal>
      )}
    </div>
  );
}