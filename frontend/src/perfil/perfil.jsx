import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { updateUserProfile } from '../utils/api';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserShield,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import './perfil.css';

export function Perfil() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    endereco: user?.endereco || '',
    avatar: user?.avatar || '',
  });

  // Update editData when user data changes or component mounts
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        phone: user.phone || '',
        endereco: user.endereco || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Only send fields that have changed
      const updateData = {};
      if (editData.name !== user?.name) updateData.name = editData.name;
      if (editData.phone !== user?.phone) updateData.phone = editData.phone;
      if (editData.endereco !== user?.endereco) updateData.endereco = editData.endereco;
      if (editData.avatar !== user?.avatar) updateData.avatar = editData.avatar;

      if (Object.keys(updateData).length === 0) {
        setSuccess('Nenhuma alteração foi feita.');
        setIsEditing(false);
        return;
      }

      const response = await updateUserProfile(updateData);
      
      // Update the user data in the auth context
      if (response.user) {
        updateUser(response.user);
        setSuccess('Perfil atualizado com sucesso!');
        setIsEditing(false);
        
        // Update the editData to reflect the new user data
        setEditData({
          name: response.user.name || '',
          phone: response.user.phone || '',
          endereco: response.user.endereco || '',
          avatar: response.user.avatar || '',
        });
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      phone: user?.phone || '',
      endereco: user?.endereco || '',
      avatar: user?.avatar || '',
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleEditClick = () => {
    // Ensure editData is up to date when entering edit mode
    setEditData({
      name: user?.name || '',
      phone: user?.phone || '',
      endereco: user?.endereco || '',
      avatar: user?.avatar || '',
    });
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDefaultAvatar = () => {
    // Default avatar as a simple SVG in base64
    const svg = `
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#195DF4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4CAF50;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="60" fill="url(#grad1)"/>
        <text x="60" y="75" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">
          ${getInitials(user?.name)}
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter menos de 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      {!user ? (
        <div className="loading-container">
          <div className="loading-spinner">Carregando perfil...</div>
        </div>
      ) : (
        <>
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
              <button onClick={() => setError('')} className="alert-close">×</button>
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              <span>{success}</span>
              <button onClick={() => setSuccess('')} className="alert-close">×</button>
            </div>
          )}

          <div className="profile-header">
            <div className="profile-cover">
              <div className="profile-cover-overlay"></div>
            </div>
            <div className="profile-info-header">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {(user?.avatar || editData.avatar) ? (
                    <img 
                      src={isEditing ? (editData.avatar || user?.avatar) : (user?.avatar || getDefaultAvatar())} 
                      alt="Avatar"
                      className="avatar-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="avatar-initials"
                    style={{ 
                      display: (user?.avatar || editData.avatar) ? 'none' : 'flex' 
                    }}
                  >
                    {getInitials(user?.name)}
                  </div>
                </div>
                {isEditing && (
                  <div className="avatar-edit">
                    <label htmlFor="avatar-upload" className="avatar-upload-btn">
                      <FaEdit />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                )}
                {user?.isAdmin && (
                  <div className="admin-badge">
                    <FaUserShield />
                  </div>
                )}
              </div>
              <div className="profile-name-section">
                <h1 className="profile-name">{user?.name || 'Usuário'}</h1>
                <p className="profile-role">
                  {user?.isAdmin ? 'Administrador' : 'Membro'}
                </p>
              </div>
              <div className="profile-actions">
                {!isEditing ? (
                  <button className="edit-btn" onClick={handleEditClick}>
                    <FaEdit /> Editar Perfil
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button 
                      className="save-btn" 
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      <FaSave /> {isLoading ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button 
                      className="cancel-btn" 
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      <FaTimes /> Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-main">
              <div className="info-card">
                <h2 className="card-title">Informações Pessoais</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">
                      <FaUser />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Nome Completo</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editData.name}
                          onChange={handleInputChange}
                          className="edit-input"
                        />
                      ) : (
                        <span className="info-value">
                          {user?.name || 'Não informado'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaEnvelope />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Email</label>
                      <span className="info-value">
                        {user?.email || 'Não informado'}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaPhone />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Telefone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Seu número de telefone"
                        />
                      ) : (
                        <span className="info-value">
                          {user?.phone || 'Não informado'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Endereço</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="endereco"
                          value={editData.endereco}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Seu endereço"
                        />
                      ) : (
                        <span className="info-value">
                          {user?.endereco || 'Não informado'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Membro desde</label>
                      <span className="info-value">
                        {formatDate(user?.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaUserShield />
                    </div>
                    <div className="info-content">
                      <label className="info-label">Tipo de Conta</label>
                      <span
                        className={`info-value ${user?.isAdmin ? 'admin-text' : 'member-text'}`}>
                        {user?.isAdmin ? 'Administrador' : 'Membro'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-sidebar">
              <div className="stats-card">
                <h3 className="card-title">Estatísticas</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">{user?.planId ? '1' : '0'}</div>
                    <div className="stat-label">Plano Ativo</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">
                      {formatDate(user?.updated_at) !== 'N/A'
                        ? Math.floor(
                            (new Date() - new Date(user?.updated_at)) /
                              (1000 * 60 * 60 * 24),
                          )
                        : 0}
                    </div>
                    <div className="stat-label">Dias desde última atualização</div>
                  </div>
                </div>
              </div>

              <div className="activity-card">
                <h3 className="card-title">Atividade Recente</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-text">Perfil atualizado</p>
                      <span className="activity-time">
                        {formatDate(user?.updated_at)}
                      </span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-text">Conta criada</p>
                      <span className="activity-time">
                        {formatDate(user?.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Perfil;
