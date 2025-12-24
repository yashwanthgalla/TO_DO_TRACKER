import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <div className="header-text">
          <h1 className="header-title">Study & Interview Preparation Tracker</h1>
          <p className="header-subtitle">6-Month Journey to Success</p>
        </div>
      </div>
    </header>
  );
}

export default Header;


