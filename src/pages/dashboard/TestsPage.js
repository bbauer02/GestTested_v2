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


export default function TestsPage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Administration: Tests | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des tests"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Tests' }
                    ]}
                />
                <Card>
                    AdminTestsPage Component
                </Card>
            </Container>
        </>
    );
}