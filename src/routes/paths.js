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
    sessions: {
      root: path(ROOTS_DASHBOARD, '/admin/sessions'),
    },
    tests: {
      root: path(ROOTS_DASHBOARD, '/admin/tests'),
    },
    exams: {
      root: path(ROOTS_DASHBOARD, '/admin/exams'),
    },
    users: {
      root: path(ROOTS_DASHBOARD, '/admin/users'),
    },
    skills: {
      root: path(ROOTS_DASHBOARD, '/admin/skills'),
    },
    invoices: {
      root: path(ROOTS_DASHBOARD, '/admin/invoices'),
    },
  }
};
