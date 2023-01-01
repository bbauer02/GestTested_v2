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
  ExamsPage,
  TestsPage,
  SessionsPage,
  InvoicesPage,
  InstitutListPage,
  InstitutEditPage,
  InstitutExaminatorsPage,
  InstitutSessionsListPage,
  InstitutUsersPage,
  InstitutDetailsPage,
  InstitutCreatePage,
  InstitutPricesPage,
  UsersPage
} from './elements';
import SkillsPage from "../pages/dashboard/SkillsPage";

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
              path: 'institut',
              children: [
                { element: <Navigate to="/dashboard/admin/institut/list" replace />, index: true },
                {path: 'list', element: (
                      <InstitutListPage />
                )},
                {path: 'create', element: (
                      <InstitutCreatePage />
                )},
                {path: ':id/edit', element: (
                      <InstitutEditPage />
                )},
                {path: ':id/details', element: (
                      <InstitutDetailsPage />
                )},
                {path: ':id/users', element: (
                      <InstitutUsersPage />
                )},
                {path: ':id/examinators', element: (
                      <InstitutExaminatorsPage />
                )},
                {path: ':id/sessions', element: (
                      <InstitutSessionsListPage />
                )},
                {path: ':id/prices', element: (
                      <InstitutPricesPage />
                )}
              ]
            },
            {
              path: 'users',
              children: [
                { element: <Navigate to="/dashboard/admin/users/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <UsersPage />
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
                          <TestsPage />
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
                          <SessionsPage />
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
                          <SkillsPage />
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
                          <ExamsPage />
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
                          <InvoicesPage />
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
