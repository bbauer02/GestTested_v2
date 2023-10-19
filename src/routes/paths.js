// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, '/home'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profil: path(ROOTS_DASHBOARD, '/profil'),
    settings: path(ROOTS_DASHBOARD, '/user/settings'),
  },
  admin: {
    institut: {
      root: path(ROOTS_DASHBOARD, '/admin/institut/'),
      list: path(ROOTS_DASHBOARD, '/admin/institut/list'),
      create: path(ROOTS_DASHBOARD, `/admin/institut/create`),
      edit: (id) => path(ROOTS_DASHBOARD, `/admin/institut/${id}/edit`),
      details: (id) => path(ROOTS_DASHBOARD, `/admin/institut/${id}/details`),
      users: (id) => path(ROOTS_DASHBOARD, `/admin/institut/${id}/users`),
      examinators: (id) => path(ROOTS_DASHBOARD, `/admin/institut/${id}/examinators`),
      sessions: (id) => path(ROOTS_DASHBOARD, `/admin/institut/${id}/sessions`),
      prices: (id) => path(ROOTS_DASHBOARD, `/admin/institut/${id}/prices`),

    },
    session: {
      root: path(ROOTS_DASHBOARD, '/admin/session'),
      list: path(ROOTS_DASHBOARD, '/admin/session/list'),
      create: path(ROOTS_DASHBOARD, `/admin/session/create`),
      edit: (institut_id, session_id) => path(ROOTS_DASHBOARD, `/admin/institut/${institut_id}/session/${session_id}/edit`),

    },
    test: {
      root: path(ROOTS_DASHBOARD, '/admin/test'),
      list: path(ROOTS_DASHBOARD, '/admin/test/list'),
      create: path(ROOTS_DASHBOARD, `/admin/test/create`),
      edit: (id) => path(ROOTS_DASHBOARD, `/admin/test/${id}/edit`),
    },
    exam: {
      root: path(ROOTS_DASHBOARD, '/admin/exam'),
      list: path(ROOTS_DASHBOARD, '/admin/exam/list'),
      create: path(ROOTS_DASHBOARD, `/admin/exam/create`),
      edit: (id) => path(ROOTS_DASHBOARD, `/admin/exam/${id}/edit`),
    },
    user: {
      root: path(ROOTS_DASHBOARD, '/admin/user'),
      edit: (id) => path(ROOTS_DASHBOARD, `/admin/user/${id}/edit`),
    },
    skill: {
      root: path(ROOTS_DASHBOARD, '/admin/skill'),
    },
    invoice: {
      root: path(ROOTS_DASHBOARD, '/admin/invoice'),
    },
  },
  institut : {
    root: path(ROOTS_DASHBOARD, '/institut'),
    profile: path(ROOTS_DASHBOARD, '/institut/profile'),
    sessions: {
      root: path(ROOTS_DASHBOARD, '/institut/sessions'),
      create: path(ROOTS_DASHBOARD, `/institut/sessions/create`),
      edit: (session_id) => path(ROOTS_DASHBOARD, `/institut/sessions/${session_id}/edit`),
    }

  },
  session : {
    detail: (institut_id, session_id) => path(ROOTS_DASHBOARD, `/institut/${institut_id}/sessions/${session_id}`),
    users: (institut_id, session_id) => path(ROOTS_DASHBOARD, `/institut/${institut_id}/sessions/${session_id}/users`),
    user: (session_id, user_id) => path(ROOTS_DASHBOARD, `/institut/sessions/${session_id}/users/${user_id}/detail`),
  }
};
