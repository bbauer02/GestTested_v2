import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from 'react';
// @mui
import {Container,Card, Tabs, Tab, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// components
import Iconify from '../../../components/iconify';

import { useSettingsContext } from '../../../components/settings';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// Redux
import { useDispatch, useSelector } from '../../../redux/store';
// Slices
import { getInstitut } from "../../../redux/slices/institut";
// sections
import {
    Profile,
    ProfileCover,
    ProfileSessionsInstitut,
} from '../../../sections/@dashboard/institut/profile';


export default function InstitutProfilePage() {
    const { themeStretch } = useSettingsContext();
    const { user } = useAuthContext();
    const dispatch = useDispatch();
    const { institut } = useSelector((state) => state.institut);
    const institut_id = user.instituts[0].institut_id;
    useEffect(() => {
        dispatch(getInstitut(institut_id));
    }, [dispatch, institut_id]);


    const [currentTab, setCurrentTab] = useState('profile');

    const TABS = [
        {
            value: 'profile',
            label: 'Profile',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <Profile institut={institut} />,
        },
        {
            value: 'session',
            label: 'Sessions',
            icon: <Iconify icon="material-symbols:component-exchange" />,
            component: <ProfileSessionsInstitut institut={institut} />,
        }
    ];


    return (
        <>
            <Helmet>
                <title> Gestion: Institut | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Profile de l'Institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: institut?.label }
                    ]}
                />
                <Card
                    sx={{
                        mb: 3,
                        height: 280,
                        position: 'relative',
                    }}
                >

                <ProfileCover institut={institut} />
                <Tabs
                    value={currentTab}
                    onChange={(event, newValue) => setCurrentTab(newValue)}
                    sx={{
                        width: 1,
                        bottom: 0,
                        zIndex: 9,
                        position: 'absolute',
                        bgcolor: 'background.paper',
                        '& .MuiTabs-flexContainer': {
                            pr: { md: 3 },
                            justifyContent: {
                                sm: 'center',
                                md: 'flex-end',
                            },
                        },
                    }}
                >
                    {TABS.map((tab) => (
                        <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                    ))}
                </Tabs>

                </Card>
                {TABS.map(
                    (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
                )}
            </Container>
        </>
    );
}