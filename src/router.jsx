// src/router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';

// Módulos vacíos temporalmente
const Servicios = () => <h1 className="text-xl font-bold">Gestión de Servicios</h1>;
const Proyectos = () => <h1 className="text-xl font-bold">Gestión de Proyectos</h1>;
const Mensajes = () => <h1 className="text-xl font-bold">Mensajes Recibidos</h1>;

const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'servicios',
        element: <Servicios />,
      },
      {
        path: 'proyectos',
        element: <Proyectos />,
      },
      {
        path: 'mensajes',
        element: <Mensajes />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
