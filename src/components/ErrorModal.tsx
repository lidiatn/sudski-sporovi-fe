import React from 'react';

type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {


  return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[var(--error-menu)] rounded-2xl p-6 max-w-1/2 shadow-lg text-center space-y-4">
          <h2 className="text-2xl font-bold text-[var(--error-text)]">Došlo je do pogreške</h2>
          <p className="text-black text-xl">{message}</p>
          <button
              onClick={onClose}
              className="mt-4 bg-[var(--button-hover)] hover:bg-[var(--button-base)] text-white px-4 py-2 rounded"
          >
            Zatvori
          </button>
        </div>
      </div>
  );
};

export default ErrorModal;