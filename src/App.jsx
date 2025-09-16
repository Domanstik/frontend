import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { UIProvider } from '@contexts/ui-context';
import TelegramProvider from './app/TelegramProvider';
import AppLayout from './AppLayout';
import AdminPanel from '@screens/Admin/AdminPanel';
import AdminContests from '@screens/Admin/Contests/AdminContests';
import CreateContest from '@screens/Admin/Contests/CreateContest';
import EditContest from '@screens/Admin/Contests/EditContest';


import Dashboard from '@screens/Dashboard/Dashboard';
import Store from '@screens/Store/Store';
import Contests from '@screens/Contests/Contests';
import Leaderboard from '@screens/Leaderboard/Leaderboard';
import Notifications from '@screens/Notifications/Notifications';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'store', element: <Store /> },
        { path: 'contests', element: <Contests /> },
        { path: 'leaderboard', element: <Leaderboard /> },
        { path: 'notifications', element: <Notifications /> },

        // Admin
        { path: 'admin', element: <AdminPanel /> },
        // ...
        { path: 'admin/contests', element: <AdminContests /> },
        { path: 'admin/contests/create', element: <CreateContest /> },
        { path: 'admin/contests/:id/edit', element: <EditContest /> }, // <— НОВОЕ
        // ...
      ],
    },
  ],
  { initialEntries: ['/dashboard'] },
);

export default function App() {
  return (
    <TelegramProvider>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </TelegramProvider>
  );
}
