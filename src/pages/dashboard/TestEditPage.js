import {useEffect} from "react";
import { Helmet } from 'react-helmet-async';
import {useLocation, useParams} from 'react-router-dom';
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
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTest } from '../../redux/slices/test';



export default function TestCreatePage() {
    const dispatch = useDispatch();
    const { themeStretch } = useSettingsContext();
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');
    const { id } = useParams();
    useEffect(() => {
        dispatch(getTest(id));
    }, [dispatch, id]);

    const { test } = useSelector((state) => state.test);

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
                        { name: "Edition d'un test" }
                    ]}
                />
                <TestNewEditForm isEdit={isEdit} currentTest={test}/>
            </Container>
        </>
    );
}