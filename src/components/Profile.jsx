import { useState } from 'react';
import './Profile.css';
import { Icons } from '../utils/icons';

function Profile({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    experience: user.experience || 'Beginner'
  });

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...editData
    };
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    onUpdate(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      experience: user.experience || 'Beginner'
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h2 className="profile-title">Profile</h2>
        {!isEditing && (
          <button
            className="profile-edit-button"
            onClick={() => setIsEditing(true)}
          >
            {Icons.edit}
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="profile-card">
        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-avatar">
              <div className="profile-avatar-circle">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-info-item">
                <span className="profile-info-label">Name:</span>
                <span className="profile-info-value">{user.name}</span>
              </div>

              <div className="profile-info-item">
                <span className="profile-info-label">Email:</span>
                <span className="profile-info-value">{user.email}</span>
              </div>

              {user.phone && (
                <div className="profile-info-item">
                  <span className="profile-info-label">Phone:</span>
                  <span className="profile-info-value">{user.phone}</span>
                </div>
              )}

              <div className="profile-info-item">
                <span className="profile-info-label">Experience Level:</span>
                <span className="profile-info-value">{user.experience || 'Beginner'}</span>
              </div>

              <div className="profile-info-item">
                <span className="profile-info-label">Member Since:</span>
                <span className="profile-info-value">{formatDate(user.joinedDate)}</span>
              </div>
            </div>

            {user.progress && (
              <div className="profile-stats">
                <div className="profile-stat-item">
                  <span className="profile-stat-value">{user.progress.daysCompleted || 0}</span>
                  <span className="profile-stat-label">Days Completed</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-value">{user.progress.problemsSolved || 0}</span>
                  <span className="profile-stat-label">Problems Solved</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-value">{user.progress.currentStreak || 0}</span>
                  <span className="profile-stat-label">Current Streak</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="profile-edit">
            <div className="profile-edit-field">
              <label className="profile-edit-label">Name</label>
              <input
                type="text"
                className="profile-edit-input"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>

            <div className="profile-edit-field">
              <label className="profile-edit-label">Email</label>
              <input
                type="email"
                className="profile-edit-input"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>

            <div className="profile-edit-field">
              <label className="profile-edit-label">Phone</label>
              <input
                type="tel"
                className="profile-edit-input"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                placeholder="Optional"
              />
            </div>

            <div className="profile-edit-field">
              <label className="profile-edit-label">Experience Level</label>
              <select
                className="profile-edit-input"
                value={editData.experience}
                onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="profile-edit-actions">
              <button
                className="profile-save-button"
                onClick={handleSave}
              >
                {Icons.save}
                <span>Save Changes</span>
              </button>
              <button
                className="profile-cancel-button"
                onClick={handleCancel}
              >
                {Icons.x}
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

