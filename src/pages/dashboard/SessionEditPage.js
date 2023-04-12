import {useEffect} from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import {
    Container
} from '@mui/material';
import {useLocation, useParams} from "react-router-dom";
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
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { institut_id, session_id } = useParams();
    const isEdit = pathname.includes('edit');

    useEffect(() => {
        dispatch(getSession(institut_id, session_id));
    }, [dispatch, institut_id, session_id]);

    const { session } = useSelector((state) => state.session);
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
                        { name : 'Sessions', href: PATH_DASHBOARD.admin.session.root},
                        { name: "Edition d'une session" }
                    ]}
                />
                <SessionNewEditForm isEdit={isEdit} currentSession={session}/>
            </Container>
        </>
    );
}