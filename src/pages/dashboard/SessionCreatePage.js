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
import SessionNewEditForm from "../../sections/@dashboard/session/form";


export default function SessionCreatePage() {
    const { themeStretch } = useSettingsContext();
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');

    //  <SessionNewEditForm isEdit={isEdit} currentInstitut={null} />

    return (
        <>
            <Helmet>
                <title> Session: Création d&apos;une session | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Création d'une session"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {name : 'Sessions', href: PATH_DASHBOARD.admin.session.root},
                        { name: "Création d'une session" }
                    ]}
                />
                <SessionNewEditForm />
            </Container>
        </>
    );
}