
import { useEffect, useState } from 'react'
import './App.css'
import './styles/register.css'
import RouteIndex from './routes/RouteIndex'

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      {loading ? (
        <div className="loader">Loading...</div>
      ) :
        (
          <RouteIndex />
        )}
    </main>
  )
}

export default App
