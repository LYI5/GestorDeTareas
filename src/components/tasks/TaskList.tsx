import { TaskItem } from './TaskItem'
import { Modal } from '../common/Modal'
import { TaskForm } from './TaskForm'
import { useTaskContext } from '../../context/TaskContext'



export function TaskList() {
  const {
    tasks,
    filter,
    isModalOpen,
    editingTask,
    setFilter,
    setIsModalOpen,
    handleAddTask,
    handleSubmit
  } = useTaskContext();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    return task.status === 'completed';
  });

  return (
    <div className="mt-6 px-4 sm:px-0">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Tareas</h2>
          <button
            onClick={handleAddTask}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Nueva Tarea
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Todas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Pendientes
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Completadas
          </button>
        </div>
        
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas {filter !== 'all' ? 'en esta categoría' : ''}</p>
        ) : (
          <ul className="space-y-4">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                {...task}
              />
            ))}
          </ul>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}