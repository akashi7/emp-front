import { Route, Routes } from 'react-router-dom'
import AllTask from './components/allTasks/tasks'
import { Dashboard } from './routes/dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/tasks' element={<AllTask />} />
    </Routes>
  )
}

export default App
