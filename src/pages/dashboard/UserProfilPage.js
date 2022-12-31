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


export default function UserProfilPage() {
    const { themeStretch } = useSettingsContext();
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
                        { name: 'User' }
                    ]}
                />
                <Card>
                    UserProfil Component
                </Card>
            </Container>
        </>
    );
}