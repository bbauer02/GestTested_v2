import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// DashBoard
export const UserSettingsPage = Loadable(lazy(() => import('../pages/dashboard/UserSettingsPage')));
export const UserProfilPage = Loadable(lazy(() => import('../pages/dashboard/UserProfilPage')));
export const AdminExamsPage = Loadable(lazy(() => import('../pages/dashboard/AdminExamsPage')));
export const AdminInstitutsPage = Loadable(lazy(() => import('../pages/dashboard/AdminInstitutsPage')));
export const AdminInvoicesPage = Loadable(lazy(() => import('../pages/dashboard/AdminInvoicesPage')));
export const AdminSessionsPage = Loadable(lazy(() => import('../pages/dashboard/AdminSessionsPage')));
export const AdminTestsPage = Loadable(lazy(() => import('../pages/dashboard/AdminTestsPage')));
export const AdminUsersPage = Loadable(lazy(() => import('../pages/dashboard/AdminUsersPage')));

export const DashboardMainPage = Loadable(lazy( () => import('../pages/dashboard/DashboardMainPage')));
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
