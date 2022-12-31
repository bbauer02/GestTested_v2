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
    instituts: {
      root: path(ROOTS_DASHBOARD, '/admin/instituts'),
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
