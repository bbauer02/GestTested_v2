import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import {
    Container,
    Card
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getExam } from '../../redux/slices/exam';
// components
import { useSettingsContext } from '../../components/settings';
import ExamNewEditForm from "../../sections/@dashboard/exam/ExamNewEditForm";


export default function ExamEditPage() {
    const dispatch = useDispatch();
    const { themeStretch } = useSettingsContext();
    const { pathname } = useLocation();
    const { id } = useParams();
    const isEdit = pathname.includes('edit');
    const { exam } = useSelector((state) => state.exam);

    useEffect(() => {
        if (isEdit) {
            dispatch(getExam(id));
        }
    }, [dispatch, id, isEdit]);

    return (
        <>
            <Helmet>
                <title> Administration: Epreuves | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edition d'une épreuve"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Liste des épreuves', href: PATH_DASHBOARD.admin.exam.list },
                        { name: "Edition d'une épreuve"  }
                    ]}
                />
                <ExamNewEditForm isEdit currentExam={exam}/>
            </Container>
        </>
    );
}