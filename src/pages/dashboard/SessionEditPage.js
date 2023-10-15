import {useEffect} from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import {
    Container
} from '@mui/material';
import {useLocation, useParams} from "react-router-dom";
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getSession } from "../../redux/slices/session";

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import SessionNewEditForm from "../../sections/@dashboard/session/form";



export default function SessionEditPage() {
    const { user } = useAuthContext();
    const { pathname } = useLocation();
    const isInstitutPage = pathname.includes(PATH_DASHBOARD.institut.sessions.root);

    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const isEdit = pathname.includes('edit');

    const { institut_id, session_id } = useParams();

    let institutId = institut_id;
    if(isInstitutPage) {
        institutId=user.instituts[0].institut_id;
    }
    useEffect(() => {
        if(institutId && session_id) {
            dispatch(getSession(institutId, session_id));
        }  
    }, [dispatch, institutId, session_id]);





    return (
        <>
            <Helmet>
                <title> Session: Edition d&apos;une session | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Edition d'une session"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name : 'Sessions', href: isInstitutPage? PATH_DASHBOARD.institut.sessions.root : PATH_DASHBOARD.admin.session.root},
                        { name: "Edition d'une session" }
                    ]}
                />
                <SessionNewEditForm isEdit={isEdit} />
            </Container>
        </>
    );
}