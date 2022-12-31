import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  LoginPage,
  UserSettingsPage,
  DashboardMainPage,
  UserProfilPage,
  AdminExamsPage,
  AdminTestsPage,
  AdminSessionsPage,
  AdminInvoicesPage,
  AdminInstitutsPage,
  AdminUsersPage
} from './elements';
import AdminSkillsPage from "../pages/dashboard/AdminSkillsPage";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <DashboardMainPage /> },
        { path: 'profil', element: <UserProfilPage /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'settings', element: <UserSettingsPage /> },
          ],
        },
        // Routes Dashboard => Admin
        {
          path: 'admin',
          children: [
            {
              path: 'instituts',
              children: [
                { element: <Navigate to="/dashboard/admin/instituts/list" replace />, index: true },
                {
                  path: 'list', element:
                  (
                      <AdminInstitutsPage />
                  )
                }
              ]
            },
            {
              path: 'users',
              children: [
                { element: <Navigate to="/dashboard/admin/users/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <AdminUsersPage />
                      )
                }
              ]
            },
            {
              path: 'tests',
              children: [
                { element: <Navigate to="/dashboard/admin/tests/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <AdminTestsPage />
                      )
                }
              ]
            },
            {
              path: 'sessions',
              children: [
                { element: <Navigate to="/dashboard/admin/sessions/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <AdminSessionsPage />
                      )
                }
              ]
            },
            {
              path: 'skills',
              children: [
                { element: <Navigate to="/dashboard/admin/skills/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <AdminSkillsPage />
                      )
                }
              ]
            },
            {
              path: 'exams',
              children: [
                { element: <Navigate to="/dashboard/admin/exams/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <AdminExamsPage />
                      )
                }
              ]
            },
            {
              path: 'invoices',
              children: [
                { element: <Navigate to="/dashboard/admin/invoices/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <AdminInvoicesPage />
                      )
                }
              ]
            }

          ]
        }
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
