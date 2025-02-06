import { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(

    <div className="fixed inset-0 z-50 overflow-y-auto">

      <div className="flex min-h-screen items-center justify-center p-4">

        <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          {children}
        </div>
      </div>
      
    </div>,
    document.body
  );
}