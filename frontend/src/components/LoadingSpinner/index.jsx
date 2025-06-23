import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = '#007bff' }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div
        className="spinner"
        style={{ borderColor: `${color}33`, borderTopColor: color }}></div>
    </div>
  );
};

export default LoadingSpinner;
