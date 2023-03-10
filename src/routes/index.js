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
  ExamListPage,
  ExamEditPage,
  ExamCreatePage,
  TestsPage,
  SessionListPage,
  InvoicesPage,
  InstitutListPage,
  InstitutEditPage,
  InstitutExaminatorsPage,
  InstitutSessionsListPage,
  InstitutUsersPage,
  InstitutDetailsPage,
  InstitutCreatePage,
  InstitutPricesPage,
  UsersPage,
  SkillsPage
} from './elements';


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
              path: 'user',
              children: [
                { element: <Navigate to="/dashboard/admin/user/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <UsersPage />
                      )
                }
              ]
            },
            {
              path: 'test',
              children: [
                { element: <Navigate to="/dashboard/admin/test/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <TestsPage />
                      )
                }
              ]
            },
            {
              path: 'session',
              children: [
                { element: <Navigate to="/dashboard/admin/session/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <SessionListPage />
                      )
                }
              ]
            },
            {
              path: 'skill',
              children: [
                { element: <Navigate to="/dashboard/admin/skill/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <SkillsPage />
                      )
                }
              ]
            },
            {
              path: 'exam',
              children: [
                { element: <Navigate to="/dashboard/admin/exam/list" replace />, index: true },
                {
                  path: 'list', element:
                      (
                          <ExamListPage />
                      )
                },
                {path: 'create', element: (
                      <ExamCreatePage />
                )},
                {path: ':id/edit', element: (
                      <ExamEditPage />
                )},
              ]
            },
            {
              path: 'invoice',
              children: [
                { element: <Navigate to="/dashboard/admin/invoice/list" replace />, index: true },
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
