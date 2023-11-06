import {Helmet} from "react-helmet-async";

// @mui
import {
    Button,
    Card,
    Table,
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    Tab,
    Tabs,
    Box
} from '@mui/material';
import {useParams} from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSessionUser } from "../../redux/slices/session";
//
import { useAuthContext } from '../../auth/useAuthContext';


// components
import { useSettingsContext } from '../../components/settings';

import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {PATH_DASHBOARD} from "../../routes/paths";
import Iconify from "../../components/iconify";


export default function SessionAddUserPage() {
    const dispatch = useDispatch();
    const { institut_id, session_id} = useParams();
    const { themeStretch } = useSettingsContext();
    const { session } = useSelector((state) => state.session);
    
    // Logic here to get current user role
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Session : Inscription d&apos;un candidat | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des sessions"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Institut', href: PATH_DASHBOARD.institut.profile},
                        { name: 'Session', href: PATH_DASHBOARD.session.detail(institut_id,session_id)},
                        { name: 'Sessions' }
                    ]}
                />
                SessionAddUserPage
            </Container>
        </>
    );
}