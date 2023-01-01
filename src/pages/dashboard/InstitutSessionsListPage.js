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


export default function InstitutSessionsListPage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Institut: Liste des sessions | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Liste des sessions"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: "Sessions d'un institut" }
                    ]}
                />
                <Card>
                    InstitutSessionsListPage Component
                </Card>
            </Container>
        </>
    );
}