import { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import DayTracker from './components/DayTracker';
import DayPlanView from './components/DayPlanView';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';
import Notes from './components/Notes';
import ResetModal from './components/ResetModal';
import { Icons } from './utils/icons';
import { loadData, saveData, resetData, getTodayDayNumber } from './utils/storage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState(() => loadData());
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(getTodayDayNumber());
  const [showDayPlan, setShowDayPlan] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && data) {
      saveData(data);
    }
  }, [data, isAuthenticated]);

  const handleUpdate = (day, dayData) => {
    setData(prev => ({
      ...prev,
      [day]: dayData
    }));
  };

  const handleReset = () => {
    const resetDataState = resetData();
    setData(resetDataState);
    setShowResetModal(false);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setShowDayPlan(false);
    setTimeout(() => {
      const element = document.getElementById('day-tracker-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleProblemSelect = (problemId) => {
    setSelectedProblemId(problemId);
    setCurrentSection('practice');
  };

  const handleBackToProblems = () => {
    setSelectedProblemId(null);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentSection('dashboard');
    setSelectedProblem(null);
  };Id

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  if (!isAuthenticated) {
    if (showSignup) {
      return <Signup onSignup={handleSignup} onBackToLogin={() => setShowSignup(false)} />;
    }
    return <Login onLogin={handleLogin} onSignup={() => setShowSignup(true)} />;
  }

  const renderContent = () => {
    if (currentSection === 'practice') {
      if (selectedProblemId) {
        return (
          <ProblemDetail
            problemId={selectedProblemId}
            onBack={handleBackToProblems}
          />
        );
      }
      return (
        <ProblemList
          onProblemSelect={handleProblemSelect}
          selectedDay={selectedDay}
        />
      );
    }

    if (currentSection === 'notes') {
      return <Notes />;
    }

    return (
      <>
        <Dashboard data={data} />
        <div className="app-navigation">
          <button
            className="nav-button"
            onClick={() => setShowDayPlan(!showDayPlan)}
          >
            {showDayPlan ? 'Hide Day Plan' : 'View All Days Plan'}
          </button>
        </div>
        {showDayPlan && (
          <DayPlanView data={data} onDaySelect={handleDaySelect} />
        )}
        <div id="day-tracker-section">
          <DayTracker
            data={data}
            onUpdate={handleUpdate}
            selectedDay={selectedDay}
            onDayChange={setSelectedDay}
          />
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <Header />
      <nav className="app-main-nav">
        <div className="nav-main-left">
          <button
            className={`nav-main-button ${currentSection === 'dashboard' ? 'nav-main-button-active' : ''}`}
            onClick={() => {
              setCurrentSection('dashboard');
              setSelectedProblemId(null);
              setShowProfile(false);
            }}
          >
            {Icons.dashboard}
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-main-button ${currentSection === 'practice' || selectedProblemId ? 'nav-main-button-active' : ''}`}
            onClick={() => {
              if (currentSection !== 'practice') {
                setCurrentSection('practice');
                setSelectedProblemId(null);
                setShowProfile(false);
              } else if (selectedProblemId) {
                setSelectedProblemId(null);
              }
            }}
          >
            {Icons.practice}
            <span>Practice</span>
          </button>
          <button
            className={`nav-main-button ${currentSection === 'notes' ? 'nav-main-button-active' : ''}`}
            onClick={() => {
              setCurrentSection('notes');
              setSelectedProblemId(null);
              setShowProfile(false);
            }}
          >
            {Icons.notes}
            <span>Notes</span>
          </button>
        </div>
        <div className="nav-main-right">
          <button
            className={`nav-main-button ${showProfile ? 'nav-main-button-active' : ''}`}
            onClick={() => {
              setShowProfile(!showProfile);
              setCurrentSection('dashboard');
            }}
          >
            {Icons.profile}
            <span>Profile</span>
          </button>
          <button
            className="nav-main-button nav-logout-button"
            onClick={handleLogout}
          >
            {Icons.logout}
            <span>Logout</span>
          </button>
        </div>
      </nav>
      <div className="app-content">
        {showProfile && currentSection === 'dashboard' ? (
          <Profile user={currentUser} onUpdate={handleUserUpdate} />
        ) : (
          <>
            {renderContent()}
            {currentSection === 'dashboard' && !showProfile && (
              <div className="app-actions">
                <button
                  className="reset-button"
                  onClick={() => setShowResetModal(true)}
                >
                  Reset Progress
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}

export default App;
