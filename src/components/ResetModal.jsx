import './ResetModal.css';

function ResetModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="reset-modal-overlay" onClick={onClose}>
      <div className="reset-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="reset-modal-title">Reset Progress</h3>
        <p className="reset-modal-message">
          Are you sure you want to reset all progress? This action cannot be undone.
        </p>
        <div className="reset-modal-actions">
          <button className="reset-modal-button reset-modal-button-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="reset-modal-button reset-modal-button-confirm" onClick={onConfirm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetModal;


