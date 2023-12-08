import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
    Container,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
// redux
import { useDispatch, useSelector } from '../../redux/store';
//
import { useAuthContext } from '../../auth/useAuthContext';
import { getTests } from '../../redux/slices/test';
import TestsMenu from '../../sections/@dashboard/prices/TestsMenuPrices';



export default function PricesListPage() {
    const dispatch = useDispatch();
    const { themeStretch } = useSettingsContext();

    const { user } = useAuthContext();
    const institut_id = user.instituts[0].institut_id;

    useEffect( () => {
        dispatch(getTests(false))
    }, [dispatch])


    return (
        <>
            <Helmet>
                <title> Tarifs : Liste | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Liste des tarifs de l'institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Tarifs' }
                    ]}
                />
                <TestsMenu institut={institut_id}/>
            </Container>
        </>
    );
}