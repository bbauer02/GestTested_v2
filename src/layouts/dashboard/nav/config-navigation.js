// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  profil: icon('ic_profil'),
  institut: icon('ic_institut'),
  settings: icon('ic_settings'),
  home: icon('ic_home'),
  invoices: icon('ic_invoice'),
  skills:icon('ic_skills'),
  session:icon('ic_session'),
  test:icon('ic_test'),
  exam:icon('ic_exam'),
  users:icon('ic_users'),

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Accueil', path: PATH_DASHBOARD.home, icon: ICONS.home },
      { title: 'Profil', path: PATH_DASHBOARD.user.profil, icon: ICONS.profil },
      { title: 'Paramètres', path: PATH_DASHBOARD.user.settings, icon: ICONS.settings }
    ],
  },
  {
    subheader: "Gestion de l'application",
    items: [
      {title: 'Instituts', path: PATH_DASHBOARD.admin.institut.root, icon: ICONS.institut },
      {title: 'Utilisateurs', path: PATH_DASHBOARD.admin.user.root, icon: ICONS.users },
      {title: 'Tests', path: PATH_DASHBOARD.admin.test.root, icon: ICONS.test },
      {title: 'Sessions', path: PATH_DASHBOARD.admin.session.root, icon: ICONS.session },
      {title: 'Epreuves', path: PATH_DASHBOARD.admin.exam.root, icon: ICONS.exam },
      {title: 'Compétences', path: PATH_DASHBOARD.admin.skill.root, icon: ICONS.skills },
      {title: 'Facturation', path: PATH_DASHBOARD.admin.invoice.root, icon: ICONS.invoices }
    ]
  }
];

export default navConfig;
