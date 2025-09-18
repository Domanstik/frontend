import { RouterProvider, createMemoryRouter, Navigate, Outlet } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './store/slices/uiSlice';
import ErrorBoundary from '@components/System/ErrorBoundary';
import TelegramProvider from './app/TelegramProvider';
import { UIProvider } from '@contexts/ui-context'; // пока оставим — на переходный период
import AppLayout from './AppLayout';

import Dashboard from '@screens/Dashboard/Dashboard';
import Store from '@screens/Store/Store';
import Contests from '@screens/Contests/Contests';
import Leaderboard from '@screens/Leaderboard/Leaderboard';
import Notifications from '@screens/Notifications/Notifications';
import TakeSurvey from '@screens/Surveys/TakeSurvey';

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

function AdminLayout() { return <Outlet />; }

const router = createMemoryRouter([
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
      { path: 'survey/:id', element: <TakeSurvey /> },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPanel /> },
          { path: 'contests', element: <AdminContests /> },
          { path: 'contests/create', element: <CreateContest /> },
          { path: 'contests/:id/edit', element: <EditContest /> },
          { path: 'surveys', element: <AdminSurveys /> },
          { path: 'surveys/create', element: <CreateSurvey /> },
          { path: 'merch', element: <AdminMerchList /> },
          { path: 'merch/new', element: <AdminMerchForm /> },
          { path: 'merch/:id/edit', element: <AdminMerchForm /> },
          { path: 'winners', element: <AdminWinners /> },
          { path: 'winners/:id', element: <AdminWinnersParticipants /> },
        ],
      },
    ],
  },
], { initialEntries: ['/dashboard'] });

function ThemeApplier() {
  const theme = useSelector(selectTheme);
  useEffect(() => {
    const el = document.documentElement;
    if (theme === 'dark') el.dataset.theme = 'dark';
    else if (theme === 'light') el.dataset.theme = 'light';
    else delete el.dataset.theme; // auto (Telegram)
  }, [theme]);
  return null;
}

export default function App() {
  return (
    <TelegramProvider>
      <UIProvider>
        <ThemeApplier />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </UIProvider>
    </TelegramProvider>
  );
}
