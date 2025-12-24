import './CircularProgress.css';

function CircularProgress({ percentage }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <svg className="circular-progress-svg" width="160" height="160">
        <circle
          className="circular-progress-background"
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="12"
        />
        <circle
          className="circular-progress-foreground"
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="circular-progress-text">
        <span className="circular-progress-percentage">{Math.round(percentage)}%</span>
        <span className="circular-progress-label">Overall</span>
      </div>
    </div>
  );
}

export default CircularProgress;


