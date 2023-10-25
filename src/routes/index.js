import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import RoleBasedGuard from '../auth/RoleBasedGuard';

// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  LoginPage,
  RegisterPage,
  UserSettingsPage,
  DashboardMainPage,
  UserProfilPage,
  ExamListPage,
  ExamEditPage,
  ExamCreatePage,
  TestsPage,
  TestCreatePage,
  TestEditPage,
  SessionListPage,
  SessionCreatePage,
  SessionEditPage,
  SessionDetailPage,
  SessionUserPage,
  InvoicesPage,
  InstitutListPage,
  InstitutEditPage,
  InstitutExaminatorsPage,
  InstitutSessionsListPage,
  InstitutUsersPage,
  InstitutDetailsPage,
  InstitutCreatePage,
  InstitutPricesPage,
  InstitutProfilePage,
  UsersPage,
  UserEditPage,
  SkillsPage,
  InvoicesListPage,
  PricesListPage,
  ExaminatorsListPage

} from './elements';



// ----------------------------------------------------------------------
// Loading // Action
//

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
        {
          path: 'register',
          element: (
                <RegisterPage />
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
          // Routes Institut => Gestion
        {
          path: 'institut',
          children: [
            {
              path: 'profile',
              element: <RoleBasedGuard power={3}><InstitutProfilePage /></RoleBasedGuard>
            },
            {
              path:':institut_id/sessions/:session_id',
              element: <SessionDetailPage />
            },
            {
              path:':institut_id/sessions/:session_id/users',
              element: <SessionDetailPage SelectedTab="canditats"/>
            },
            {
              path: 'sessions',
              children: [
                { element: <Navigate to="/dashboard/institut/sessions/list" replace />, index: true },
                { path: 'list', element: <SessionListPage /> },
                { path: 'create', element: <SessionCreatePage /> },
                { path: ':session_id/edit', element: <SessionEditPage /> },
                { path: ':session_id/users/:user_id/detail', element: <SessionUserPage /> },
              ]
            },
            {
              path: 'examinators',
              children: [
                { element: <Navigate to="/dashboard/institut/examinators/list" replace />, index: true },
                { path: 'list', element: <ExaminatorsListPage /> },
              ]
            },
            {
              path: 'prices',
              children: [
                { element: <Navigate to="/dashboard/institut/prices/list" replace />, index: true },
                { path: 'list', element: <PricesListPage /> },
              ]
            },
            {
              path: 'invoices',
              children: [
                { element: <Navigate to="/dashboard/institut/invoices/list" replace />, index: true },
                { path: 'list', element: <InvoicesListPage /> },
              ]
            }
          ]

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
                )},
                {path: ':institut_id/session/:session_id/edit', element: (
                      <SessionEditPage />
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
                },
                {path: ':id/edit', element: (
                      <UserEditPage />
                  )},
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
                },
                {
                    path: 'create', element:
                    (
                        <TestCreatePage />
                    )
                },
                {
                    path: ':id/edit', element:
                    (
                        <TestEditPage />
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
                },
                {
                  path: 'create', element: 
                  (
                    <SessionCreatePage />
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
