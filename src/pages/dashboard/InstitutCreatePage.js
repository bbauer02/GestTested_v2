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
import InstitutNewEditForm from "../../sections/@dashboard/institut/InstitutNewEditForm";

export default function InstitutCreatePage() {
    const { themeStretch } = useSettingsContext();
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');

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
                        {name : 'Instituts', href: PATH_DASHBOARD.admin.institut.root},
                        { name: "Création d'un institut" }
                    ]}
                />
                <InstitutNewEditForm isEdit={isEdit} currentInstitut={null}/>
            </Container>
        </>
    );
}