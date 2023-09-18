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
  }
];

export default navConfig;
