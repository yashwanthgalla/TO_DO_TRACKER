import { useState } from 'react';
import './Signup.css';

function Signup({ onSignup, onBackToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    experience: 'Beginner'
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      setError('Email already registered. Please sign in.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || '',
      experience: formData.experience,
      joinedDate: new Date().toISOString(),
      progress: {
        daysCompleted: 0,
        problemsSolved: 0,
        currentStreak: 0
      }
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    onSignup(newUser);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Start your interview preparation journey</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <div className="signup-error">{error}</div>}

          <div className="signup-field">
            <label htmlFor="name" className="signup-label">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              className="signup-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email" className="signup-label">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              className="signup-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="phone" className="signup-label">Phone (Optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="signup-input"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="experience" className="signup-label">Experience Level</label>
            <select
              id="experience"
              name="experience"
              className="signup-input"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="signup-field">
            <label htmlFor="password" className="signup-label">Password *</label>
            <div className="signup-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="signup-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="confirmPassword" className="signup-label">Confirm Password *</label>
            <div className="signup-password-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="signup-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <a href="#login" className="signup-link" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>Sign In</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

