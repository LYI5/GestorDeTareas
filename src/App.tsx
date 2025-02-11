import { TaskList } from './components/tasks/TaskList'
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Lewis Tasks
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App
