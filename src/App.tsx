
import './App.css'
import Login from './auth/login'
import Register from './auth/register'
import Chat from './chat/chatbot'
import Materia from './chat/materia'

function App() {


  return (
    <>
      <div className=' flex items-center justify-center min-h-[80vh]'>
        <Chat />
      </div>

    </>
  )
}

export default App
