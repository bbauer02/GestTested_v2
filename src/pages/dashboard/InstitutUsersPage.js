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


export default function InstitutUsersPage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Institut: Liste des utilisateurs | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Liste des utilisateurs d'un institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: "Utilisateurs d'un institut" }
                    ]}
                />
                <Card>
                    InstitutUsersPage Component
                </Card>
            </Container>
        </>
    );
}