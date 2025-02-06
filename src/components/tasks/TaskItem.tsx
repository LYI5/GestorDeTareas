import { motion } from 'framer-motion'; 
interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  onStatusChange: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
export function TaskItem({
  id,
  title,
  description,
  status,
  onStatusChange,
  onEdit,
  onDelete
}: TaskItemProps) {
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
            onChange={() => onStatusChange(id)}
            className="h-4 w-4 mt-1 text-blue-600 rounded"
          />
          <div className={status === 'completed' ? 'line-through text-gray-500' : ''}>
            <h3 className="font-medium break-words">{title}</h3>
            <p className="text-sm text-gray-600 break-words">{description}</p>
          </div>

        </div>

        <div className="flex space-x-2 ml-7 sm:ml-0">

          <button
            onClick={() => onEdit(id)}
            className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition-colors">

            Editar

          </button>

          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800 px-2 py-1 rounded transition-colors">

            Eliminar

          </button>
          
        </div>
      </div>
    </motion.li>
  );
}