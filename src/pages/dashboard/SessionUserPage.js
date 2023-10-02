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

import Iconify from "../../components/iconify";

//
import { useAuthContext } from '../../auth/useAuthContext';

export default function SessionUserPage() {
    // Logic here to get current user role
    const { user } = useAuthContext();

    const { themeStretch } = useSettingsContext();
    const { session_id, user_id} = useParams();
    const { sessionUser } = useSelector((state) => state.session);
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentTab, setCurrentTab] = useState('coordonnees');

    useEffect(() => {
        dispatch(getSessionUser(user.instituts[0].institut_id, session_id, user_id));
    }, [dispatch,session_id, user_id, user.instituts] )


    console.log(sessionUser?.User)
    const TABS = [
        {
            value: 'coordonnees',
            label: 'Coordonnées',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <SessionDetailUserGeneral user={sessionUser?.User} />,
        },
        {
            value: 'options',
            label: 'Options choisies',
            icon: <Iconify icon="iconamoon:options" />,
            component: <>Options Choisies</>,
        },
        {
            value: 'documents',
            label: 'Documents',
            icon: <Iconify icon="ic:baseline-folder" />,
            component: <>Document</>,
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
                        { name: 'Institut', href: PATH_DASHBOARD.root },
                        { name: 'Session', href: PATH_DASHBOARD.root },
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