import {useEffect, useState} from "react";
import { Helmet } from 'react-helmet-async';
import {useLocation, useParams} from 'react-router-dom';
// @mui
import {
    Box,
    Container, Tab, Tabs,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import UserNewEditGeneral from "../../sections/@dashboard/user/form/UserNewEditGeneral";


// redux
import { useDispatch, useSelector } from '../../redux/store';
import Iconify from "../../components/iconify";
import {getUser} from "../../redux/slices/user";


export default function UserEditPage() {

    const { themeStretch } = useSettingsContext();


    const [currentTab, setCurrentTab] = useState('general');

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { id } = useParams();
    const isEdit = pathname.includes('edit');
    useEffect(() => {
        dispatch(getUser(id));
    }, [dispatch, id]);

    const { user } = useSelector((state) => state.user);


    const TABS = [
        {
            value: 'general',
            label: 'General',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <UserNewEditGeneral isEdit currentUser={user}/>,
        },
    ];

    return (
        <>
            <Helmet>
                <title> Administration: Utilisateurs | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration d'un utilisateur"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Utilisateurs', href: PATH_DASHBOARD.admin.user.root },
                        { name: "Edition d'un utilisateur" }
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