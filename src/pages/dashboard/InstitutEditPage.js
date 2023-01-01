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


export default function InstitutEditPage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Institut: Edition | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edition d'un institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: "Edition d'un institut" }
                    ]}
                />
                <Card>
                    InstitutEditPage Component
                </Card>
            </Container>
        </>
    );
}