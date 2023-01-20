import { Helmet } from 'react-helmet-async';
// @mui
import {
    Container,
    Card
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {deleteExam, getExams} from '../../redux/slices/exam';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import {
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableSkeleton,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../components/table';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'session_id', label: 'ID', align: 'left'},
    { id: 'start', label: 'Début', align: 'left' },
    { id: 'institut_id', label: 'Institut', align: 'left'},
    { id: 'test_id', label: 'Test / Niveau', align: 'left' },
    { id: 'subscribers', label: 'Inscrits', align: 'left' },
    { id: 'validation', label: 'Validation', align: 'left' },
    { id: 'action', label: 'Action', align: 'left' },
];


export default function SessionListPage() {
    const { themeStretch } = useSettingsContext();
    return (
        <>
            <Helmet>
                <title> Administration: Sessions | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des sessions"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Sessions' }
                    ]}
                />
                <Card>
                    AdminSessionsPage Component
                </Card>
            </Container>
        </>
    );
}