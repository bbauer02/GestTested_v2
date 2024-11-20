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

import QuestionCreatorForm from '../../sections/@dashboard/questions/form/createForm';


export default function QuestionCreatePage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Question: Création | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Création des questions de tests"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Questions', href: PATH_DASHBOARD.questions.root },
                        { name: 'Création' }
                    ]}
                />
                <Card>

                    <QuestionCreatorForm />
                </Card>
            </Container>
        </>
    );
}