import { useState } from 'react';

interface TaskFormProps {
  task?: {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
  };
  onSubmit: (task: { title: string; description: string; status: 'pending' | 'completed' }) => void;
  onClose: () => void;
}

export function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<'pending' | 'completed'>(task?.status || 'pending');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('El título es requerido');
      return;
    }
    onSubmit({ title, description, status });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-semibold mb-4">

        {task ? 'Editar Tarea' : 'Nueva Tarea'}

      </h2>
      
      <div>

        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa el título de la tarea"
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      </div>

      <div>

        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa la descripción de la tarea"
        />

      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pendiente</option>
          <option value="completed">Completada</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
          Cancelar
        </button>

        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
          {task ? 'Guardar Cambios' : 'Crear Tarea'}
          
        </button>
      </div>
    </form>
  );
}