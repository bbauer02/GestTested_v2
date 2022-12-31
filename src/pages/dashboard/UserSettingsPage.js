import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {
    Container,
    Tab, Tabs, Box
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';
// sections
import {
    AccountGeneral
} from "../../sections/@dashboard/user/account";

export default function UserSettingsPage() {
    const { themeStretch } = useSettingsContext();

    const [currentTab, setCurrentTab] = useState('general');
    const TABS = [
        {
            value: 'general',
            label: 'General',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <AccountGeneral />,
        },
    ];
    return (
        <>
            <Helmet>
                <title> User: Settings | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Paramètres du compte utilisateur"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Paramètres' }
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