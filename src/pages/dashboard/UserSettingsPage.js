import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {
    Container,
    Card
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';

export default function UserSettingsPage() {
    const { themeStretch } = useSettingsContext();

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

                <Card> Paramètres </Card>
            </Container>
        </>
    );
}