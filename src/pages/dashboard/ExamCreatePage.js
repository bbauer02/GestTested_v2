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
import ExamNewEditForm from "../../sections/@dashboard/exam/ExamNewEditForm";


export default function ExamCreatePage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Administration: Epreuves | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Création d'une épreuve"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Liste des épreuves', href: PATH_DASHBOARD.admin.exam.list },
                        { name: "Création d'une épreuve"  }
                    ]}
                />
                <ExamNewEditForm />
            </Container>
        </>
    );
}