import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// Redux
import { useDispatch, useSelector } from "react-redux";
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

import { getInvoice } from "../../redux/slices/invoice";
//
import { useAuthContext } from '../../auth/useAuthContext';

// sections
import InvoiceDetails from '../../sections/@dashboard/invoice/details';

export default function InvoiceDetailsPage() {
    const { themeStretch } = useSettingsContext();

    const dispatch = useDispatch();
    const { user } = useAuthContext();
    const { id } = useParams();
    const { invoice } = useSelector((state) => state.invoice);
    const institut_id = user.instituts[0].institut_id;



    useEffect(() => {
        dispatch(getInvoice(institut_id,id));
    },[dispatch, institut_id, id]);

    return (
        <>
            <Helmet>
                <title> Facture: Détail | Get-tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading={`Détail de la facture  ${invoice?.ref_invoice}`}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Factures',
                            href: PATH_DASHBOARD.institut.invoices.list,
                        },
                        { name: `${invoice?.ref_invoice}` },
                    ]}
                />

                <InvoiceDetails invoice={invoice} />

            </Container>
        </>
    )
}