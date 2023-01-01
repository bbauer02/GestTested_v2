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


export default function InstitutCreatePage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Institut: Création | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Création d'un nouvel institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: "Création d'un institut" }
                    ]}
                />
                <Card>
                    InstitutCreatePage Component
                </Card>
            </Container>
        </>
    );
}