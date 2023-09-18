// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

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

const navConfigInstitutAdmin = [
    {
        subheader: "Gestion de l'Institut",
        items: [
            {
                title: 'Institut',
                path: PATH_DASHBOARD.admin.institut.root,
                icon: ICONS.institut,
                children: [
                    { title: 'profile', path: PATH_DASHBOARD.institut.profile }
                ]
            },
        ]
    }
];

export default navConfigInstitutAdmin;
