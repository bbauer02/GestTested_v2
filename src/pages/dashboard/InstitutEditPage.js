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
import { getInstitut } from '../../redux/slices/institut';
// components
import { useSettingsContext } from '../../components/settings';
import InstitutNewEditForm from "../../sections/@dashboard/institut/InstitutNewEditForm";

export default function InstitutEditPage() {
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { id } = useParams();
    const isEdit = pathname.includes('edit');
    useEffect(() => {
        dispatch(getInstitut(id));
    }, [dispatch, id]);

    const { institut } = useSelector((state) => state.institut);


    return (
        <>
            <Helmet>
                <title> Institut: Edition | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edition d'un institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: "Edition d'un institut" }
                    ]}
                />
                <InstitutNewEditForm isEdit={isEdit} currentInstitut={institut}/>
            </Container>
        </>
    );
}