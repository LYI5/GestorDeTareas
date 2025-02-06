interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export function ConfirmModal({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">

      <div className="flex min-h-screen items-center justify-center p-4">

        <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6">

          <p className="text-gray-700 mb-6">{message}</p>

          <div className="flex justify-end space-x-3">

            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
              Cancelar
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">
              Eliminar
            </button>

          </div>

        </div>

      </div>
      
    </div>
  );
}