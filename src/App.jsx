import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { UIProvider } from '@contexts/ui-context';
import TelegramProvider from './app/TelegramProvider';
import AppLayout from './AppLayout';
// import TelegramGuard from './TelegramGuard';

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
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        { path: 'store', element: <Store /> },
        { path: 'contests', element: <Contests /> },
        { path: 'leaderboard', element: <Leaderboard /> },
        { path: 'notifications', element: <Notifications /> }
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
