// App.jsx
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { UIProvider } from '@contexts/ui-context';
import TelegramProvider from './app/TelegramProvider';
import AppLayout from './AppLayout';

// user screens
import Dashboard from '@screens/Dashboard/Dashboard';
import Store from '@screens/Store/Store';
import Contests from '@screens/Contests/Contests';
import Leaderboard from '@screens/Leaderboard/Leaderboard';
import Notifications from '@screens/Notifications/Notifications';

// admin screens
import AdminPanel from '@screens/Admin/AdminPanel';
import AdminContests from '@screens/Admin/Contests/AdminContests';
import CreateContest from '@screens/Admin/Contests/CreateContest';
import EditContest from '@screens/Admin/Contests/EditContest';
import AdminSurveys from '@screens/Admin/Surveys/AdminSurveys';
import CreateSurvey from '@screens/Admin/Surveys/CreateSurvey';
import AdminMerchList from '@screens/Admin/Merch/AdminMerchList';
import AdminMerchForm from '@screens/Admin/Merch/AdminMerchForm';
import AdminWinners from '@screens/Admin/Winners/AdminWinners';
import AdminWinnersParticipants from '@screens/Admin/Winners/AdminWinnersParticipants';

// простой layout для ветки /admin
function AdminLayout() {
  return <Outlet />;
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },

        // user routes
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'store', element: <Store /> },
        { path: 'contests', element: <Contests /> },
        { path: 'leaderboard', element: <Leaderboard /> },
        { path: 'notifications', element: <Notifications /> },

        // admin routes (nested)
        {
          path: 'admin',
          element: <AdminLayout />,
          children: [
            { index: true, element: <AdminPanel /> },

            // contests
            { path: 'contests', element: <AdminContests /> },
            { path: 'contests/create', element: <CreateContest /> },
            { path: 'contests/:id/edit', element: <EditContest /> },

            // surveys
            { path: 'surveys', element: <AdminSurveys /> },
            { path: 'surveys/create', element: <CreateSurvey /> },

            // merch
            { path: 'merch', element: <AdminMerchList /> },
            { path: 'merch/new', element: <AdminMerchForm /> },
            { path: 'merch/:id/edit', element: <AdminMerchForm /> },

            // winners
            { path: 'winners', element: <AdminWinners /> },
            { path: 'winners/:id', element: <AdminWinnersParticipants /> },
          ],
        },
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
