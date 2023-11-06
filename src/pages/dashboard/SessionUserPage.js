import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from "react";
import {useLocation, useParams} from 'react-router-dom';

// @mui
import {
    Container,
    Card, Tabs, Tab, Box
} from '@mui/material';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSessionUser } from "../../redux/slices/session";
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import  SessionDetailUserGeneral  from "../../sections/@dashboard/session/users/SessionDetailUserGeneral";
import SessionDetailUserOptions from "../../sections/@dashboard/session/users/SessionDetailUserOptions";
import SessionDetailUserGestion from "../../sections/@dashboard/session/users/SessionDetailUserGestion";
import SessionDetailUserDocuments from "../../sections/@dashboard/session/users/SessionDetailUserDocuments";

import Iconify from "../../components/iconify";

//
import { useAuthContext } from '../../auth/useAuthContext';

export default function SessionUserPage() {
    // Logic here to get current user role
    const { user } = useAuthContext();
    const dispatch = useDispatch();

    const { themeStretch } = useSettingsContext();
    const { session_id, user_id} = useParams();
    const [currentTab, setCurrentTab] = useState('coordonnees');
    const { sessionUser } = useSelector((state) => state.session);

    useEffect(() => {
        const loadUserData = () => {
            dispatch(getSessionUser(user.instituts[0].institut_id, session_id, user_id));
        };
        loadUserData();
        return () => {
            // Vous pouvez ajouter ici le nettoyage ou l'annulation de la requête en cours si nécessaire.
        };
    }, [dispatch, session_id, user_id, user]);

    const TABS = [
        {
            value: 'coordonnees',
            label: 'Coordonnées',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <SessionDetailUserGeneral sessionUser={sessionUser} />,

        },
        {
            value: 'options',
            label: 'Epreuves et options',
            icon: <Iconify icon="iconamoon:options" />,
            component: <SessionDetailUserOptions SessionDetail={sessionUser}/>,
        },
        {
            value: 'gestion',
            label: 'Gestion',
            icon: <Iconify icon="icon-park-outline:computer-one" />,
            component: sessionUser && <SessionDetailUserGestion sessionUser={sessionUser.sessionUsers[0]}/>,
        },
        {
            value: 'documents',
            label: 'Documents',
            icon: <Iconify icon="ic:baseline-folder" />,
            component: <SessionDetailUserDocuments session={sessionUser}/>,
        },
    ];


    return (
        <>
            <Helmet>
                <title> User: Profil | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Profil utilisateur"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Institut', href: PATH_DASHBOARD.institut.profile },
                        { name: 'Session', href: PATH_DASHBOARD.session.detail(user.instituts[0].institut_id, session_id) },
                        { name: 'User' }
                    ]}
                />
                <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                    ))}
                </Tabs>

                {TABS.map(
                    (tab) =>
                        tab.value === currentTab && (
                            <Box key={tab.value} sx={{ mt: 5 }}>
                                {tab.component}
                            </Box>
                        )
                )}
            </Container>
        </>
    );
}