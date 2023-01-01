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
export const ExamsPage = Loadable(lazy(() => import('../pages/dashboard/ExamsPage')));
export const InstitutListPage = Loadable(lazy(() => import('../pages/dashboard/InstitutListPage')));
export const InstitutCreatePage = Loadable(lazy(() => import('../pages/dashboard/InstitutCreatePage')));
export const InstitutDetailsPage = Loadable(lazy(() => import('../pages/dashboard/InstitutDetailsPage')));
export const InstitutEditPage = Loadable(lazy(() => import('../pages/dashboard/InstitutEditPage')));
export const InstitutExaminatorsPage = Loadable(lazy(() => import('../pages/dashboard/InstitutExaminatorsPage')));
export const InstitutSessionsListPage = Loadable(lazy(() => import('../pages/dashboard/InstitutSessionsListPage')));
export const InstitutUsersPage = Loadable(lazy(() => import('../pages/dashboard/InstitutUsersPage')));
export const InstitutPricesPage = Loadable(lazy(() => import('../pages/dashboard/InstitutPricesPage')));
export const InvoicesPage = Loadable(lazy(() => import('../pages/dashboard/InvoicesPage')));
export const SessionsPage = Loadable(lazy(() => import('../pages/dashboard/SessionsPage')));
export const TestsPage = Loadable(lazy(() => import('../pages/dashboard/TestsPage')));
export const UsersPage = Loadable(lazy(() => import('../pages/dashboard/UsersPage')));
export const DashboardMainPage = Loadable(lazy( () => import('../pages/dashboard/DashboardMainPage')));
export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
