import { useState, useEffect } from 'react'
import { TaskItem } from './TaskItem'
import { Modal } from '../common/Modal'
import { TaskForm } from './TaskForm'
import { ConfirmModal } from '../common/ConfirmModal'

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'pending') return task.status === 'pending'
    return task.status === 'completed'
  })

  const handleStatusChange = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ))
  }

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      setEditingTask(task)
      setIsModalOpen(true)
    }
  }

  const handleAddTask = () => {
    setEditingTask(undefined)
    setIsModalOpen(true)
  }

  const handleSubmit = (taskData: { title: string; description: string }) => {
    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      ))
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        status: 'pending'
      }
      setTasks([...tasks, newTask])
    }
  }

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setTasks(tasks.filter(task => task.id !== deleteId))
      setDeleteId(null)
    }
  }

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
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${ filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>

            Todas
          </button>

          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${ filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`}>
            Pendientes
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md ${ filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
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

        <ConfirmModal
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={confirmDelete}
          message="¿Estás seguro de eliminar esta tarea?"
        />

      </div>
    </div>
  )
}