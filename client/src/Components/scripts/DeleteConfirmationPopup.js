import React from "react";
import './popup.css'

export default function DeleteConfirmationPopup({ isOpen, onClose, onConfirm }) {
  return (
    <>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h5>Are you sure you want to delete this contact?</h5>
            <div className="buttons">
              <button className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="delete" onClick={onConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
