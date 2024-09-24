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
    prices:icon('ic_prices'),
    teachers:icon('ic_teachers'),
    sujet:icon('ic_sujet'),
    question:icon('ic_question'),
};

const navConfigQuestion = [
    {
        subheader: "Gestion des tests en ligne",
        items: [
            {
                title: 'Sujets',
                path: PATH_DASHBOARD.sujets.root,
                icon: ICONS.sujet,
            },
            {
                title: 'Questions',
                path: PATH_DASHBOARD.questions.root,
                icon: ICONS.question,
            },

        ]
    }
];

export default navConfigQuestion;