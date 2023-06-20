import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
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
import TestNewEditForm from "../../sections/@dashboard/test/TestNewEditForm";


export default function TestCreatePage() {
    const { themeStretch } = useSettingsContext();
    const { pathname } = useLocation();

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
                        { name: 'Tests', href: PATH_DASHBOARD.admin.test.root },
                        { name: "Création d'un test" }
                    ]}
                />
                <TestNewEditForm />
            </Container>
        </>
    );
}