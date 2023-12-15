import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
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

import {Link as RouterLink, useParams} from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../redux/slices/session";

// components
import { useSettingsContext } from '../../components/settings';
import SessionDetail from "../../sections/@dashboard/session/detail/SessionDetail";
import SessionDetailUsers from "../../sections/@dashboard/session/users/SessionDetailUsers";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {PATH_DASHBOARD} from "../../routes/paths";
import Iconify from "../../components/iconify";

// utils
import { fDateTime } from '../../utils/formatTime';

import SessionDetailToobar from "../../sections/@dashboard/session/detail/SessionDetailToolbar";

SessionDetailPage.propTypes = {
    SelectedTab: PropTypes.string,
};
export default function SessionDetailPage({SelectedTab="session"}) {
    const dispatch = useDispatch();
    const { institut_id, session_id} = useParams();
    const { themeStretch } = useSettingsContext();
    const { session } = useSelector((state) => state.session);
    const [currentTab, setCurrentTab] = useState(SelectedTab);



    useEffect(() => {
        dispatch(getSession(institut_id, session_id))
    }, [dispatch,institut_id, session_id] )


    const TABS = [
        {
            value: 'session',
            label: 'Session',
            icon: <Iconify icon="material-symbols:component-exchange" />,
            component: <SessionDetail session={ session }/>
        },
        {
            value: 'canditats',
            label: 'Candidats',
            icon: <Iconify icon="fa6-solid:users" />,
            component: <SessionDetailUsers session={ session }/>
        }
    ];

    return (
        <>
            <Helmet>
                <title> Gestion: Session | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Gestion de la session"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Institut', href: PATH_DASHBOARD.institut.profile},
                        { name: `Session du ${session&&fDateTime(session.start, "dd/MM/Y HH:mm")} au ${session&&fDateTime(session.end, "dd/MM/Y HH:mm")}` }
                    ]}

                />
               { session && <SessionDetailToobar session={ session }/>}
                <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                    ))}
                </Tabs>
                {TABS.map(
                    (tab) =>
                        tab.value === currentTab && (
                            <Box key={tab.value} sx={{ mt: 5 }}>
                                {tab.component}
                            </Box>
                        )
                )}
            </Container>
        </>
    )
}