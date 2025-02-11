import { motion } from 'framer-motion';
import { useTaskContext } from '../../context/TaskContext';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

export function TaskItem({
  id,
  title,
  description,
  status,
}: TaskItemProps) {
  const { handleStatusChange, handleEdit, handleDelete } = useTaskContext();

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={status === 'completed'}
            onChange={() => handleStatusChange(id)}
            className="h-4 w-4 mt-1 text-blue-600 rounded"
          />
          <div className={status === 'completed' ? 'line-through text-gray-500' : ''}>
            <div className="flex items-center gap-2">
              <h3 className="font-medium break-words">{title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                {status === 'completed' ? 'Completada' : 'Pendiente'}
              </span>
            </div>
            <p className="text-sm text-gray-600 break-words">{description}</p>
          </div>
        </div>

        <div className="flex space-x-2 ml-7 sm:ml-0">

          <button
            onClick={() => handleEdit(id)}
            className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition-colors">
            Editar
          </button>

          <button
            onClick={() => handleDelete(id)}
            className="text-red-600 hover:text-red-800 px-2 py-1 rounded transition-colors">
            Eliminar
          </button>

        </div>
      </div>
    </motion.li>
  );
}