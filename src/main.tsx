// main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './auth/login.tsx';
import App from './App.tsx';
import Register from './auth/register.tsx';
import ProtectedRoute from './componentes/ProtectedRoute.tsx';
import Chatbot from './chat/chatbot.tsx';
import Materia from './chat/materia.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<h1>no found</h1>}></Route>
        {/* rutas protegidas */}

        <Route path='/materia' 
        element={<ProtectedRoute>
          <Materia/>
        </ProtectedRoute> }/>
          


      </Route>
    </Routes>
  </BrowserRouter>
);
