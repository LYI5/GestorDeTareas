import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

interface TaskContextType {
    tasks: Task[];
    filter: 'all' | 'pending' | 'completed';
    isModalOpen: boolean;
    editingTask: Task | undefined;
    setFilter: (filter: 'all' | 'pending' | 'completed') => void;
    setIsModalOpen: (isOpen: boolean) => void;
    setEditingTask: (task: Task | undefined) => void;
    handleAddTask: () => void;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    handleStatusChange: (id: string) => void;
    handleSubmit: (taskData: {
        title: string;
        description: string;
        status: 'pending' | 'completed'
    }) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleStatusChange = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                : task
        ));
    };

    const handleAddTask = () => {
        setEditingTask(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            setEditingTask(task);
            setIsModalOpen(true);
        }
    };

    const handleDelete = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleSubmit = (taskData: {
        title: string;
        description: string;
        status: 'pending' | 'completed'
    }) => {
        if (editingTask) {
            setTasks(tasks.map(task =>
                task.id === editingTask.id
                    ? { ...task, ...taskData }
                    : task
            ));
        } else {
            const newTask: Task = {
                id: Date.now().toString(),
                ...taskData
            };
            setTasks([...tasks, newTask]);
        }
        setIsModalOpen(false);
    };

    const value = {
        tasks,
        filter,
        isModalOpen,
        editingTask,
        setFilter,
        setIsModalOpen,
        setEditingTask,
        handleAddTask,
        handleEdit,
        handleDelete,
        handleStatusChange,
        handleSubmit
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('que no salga esto pa q ta bien');
    }
    return context;
}