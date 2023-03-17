import { Helmet } from 'react-helmet-async';
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


export default function SessionEditPage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Session: Création d&apos;une session | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edition d'une session"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.session.root },
                        { name: "Edition d'une session" }
                    ]}
                />
                <Card>
                    SessionEditPage Component
                </Card>
            </Container>
        </>
    );
}