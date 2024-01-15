import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
} from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getSessionsFiltered, removeSession, getSessionsByInstitut} from '../../redux/slices/session';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import ConfirmDialog from '../../components/confirm-dialog';
// sections
import { SessionTableRow, SessionTableToolbar} from "../../sections/@dashboard/session/list";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'session_id', label: 'ID', align: 'left'},
    { id: 'institut', label: 'Institut', align: 'left' },
    { id: 'start', label: 'Début', align: 'left'},
    { id: 'test', label: 'Test / Niveau', align: 'left' },
    { id: 'subscribers', label: 'Inscrits', align: 'left' },
    { id: 'action', label: 'Action', align: 'left' },
    { id: '' },
];
// ----------------------------------------------------------------------


export default function SessionListPage() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({
        defaultOrderBy: 'label',
    });

    const { user } = useAuthContext();

    const { tests } = useSelector((state) => state.test);

    const {enqueueSnackbar} = useSnackbar();

    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const dispatch = useDispatch();

    const { sessions, isLoading} = useSelector((state) => state.session);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');
    const [filterTest, setFilterTest] = useState('all');
    const [optionsTest, setOptionsTest] = useState([]);
    const [optionsLevel, setOptionsLevel] = useState([]);
    const [filterLevel, setFilterLevel] = useState('all');

    const [openConfirm, setOpenConfirm] = useState(false);

    const isInstitutPage = pathname.includes(PATH_DASHBOARD.institut.sessions.root);

    const _institutId = user.instituts[0].institut_id;

    useEffect(() => {
        if (isInstitutPage) {
            dispatch(getSessionsByInstitut(_institutId));
        }
        else {
            dispatch(getSessionsFiltered());
        }
    }, [dispatch, isInstitutPage, _institutId]);

    useEffect(() => {
        if (sessions.length) {
            setTableData(sessions);
        }
    }, [sessions]);

    const dataFiltered = applyFilter({
        inputData : tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleDeleteRow = (institutId,sessionId) => {
        try {
            dispatch(removeSession(institutId,sessionId));
            enqueueSnackbar( 'Suppression de la session effectuée !' );
        }
        catch (error) {
            enqueueSnackbar( 'impossible de supprimer la session !' );
        }
    };

    const handleDetailRow = (institutId,sessionId) => {
            navigate(PATH_DASHBOARD.session.detail(institutId, sessionId));
    };

    const handleUsersSessionRow = (institutId,sessionId) => {
        navigate(PATH_DASHBOARD.session.users(institutId, sessionId));
    };

    const handleDeleteRows = (selectedRow) => {
        console.log(selectedRow)
        // const deleteRows = tableData.filter((row) => !selectedRow.includes(row.institut_id));
        // setSelected([]);
        // setTableData(deleteRows);
    };

    const handleEditRow = (institutId, sessionId) => {
        if(isInstitutPage) {
            navigate(PATH_DASHBOARD.institut.sessions.edit(sessionId));
        }
        else {
            navigate(PATH_DASHBOARD.admin.session.edit(institutId, sessionId));
        }
    };



    const handleFilterName = (filtername) => {
        setFilterName(filtername);
        setPage(0);
    };

    const handleTestFilter = (event) => {
        setPage(0);
        setFilterTest(event.target.value);
        if(event.target.value === "all") {
            setOptionsLevel([]);
            setFilterLevel('all');
        } else {
            const levels = tests.filter((test) => test.label === event.target.value)[0].Levels;
            setOptionsLevel(levels);
        }
    }

    const handleLevelFilter = (event) => {
        setPage(0);
        setFilterLevel(event.target.value);
    }

    return (
        <>
            <Helmet>
                <title> {isInstitutPage ? `Institut: Sessions | Get-Tested`:`Administration: Sessions | Get-Tested`} </title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading={isInstitutPage ? `Gestion des Sessions de : ${user.instituts[0].Institut.label}`:`Administration des sessions`}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Sessions' }
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={isInstitutPage? PATH_DASHBOARD.institut.sessions.create : PATH_DASHBOARD.admin.session.create}
                        >
                            Nouvelle Session
                        </Button>
                    }
                />
                <Card>
                    <SessionTableToolbar
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        filterTest={filterTest}
                        onFilterTest = {handleTestFilter}
                        optionsTest = {optionsTest}
                        filterLevel={filterLevel}
                        onFilterLevel = {handleLevelFilter}
                        optionsLevel = {optionsLevel}

                    />

                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.session_id)
                                )
                            }
                            action={
                                <Tooltip title="Suppression des instituts sélectionnés">
                                    <span>
                                        <IconButton disabled color="primary" onClick={handleOpenConfirm}>
                                            <Iconify icon='eva:trash-2-outline' />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            }
                        />
                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.institut_id)
                                        )
                                    }
                                />
                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <SessionTableRow
                                                    key={row.session_id}
                                                    row={row}
                                                    selected={selected.includes(row.session_id)}
                                                    onSelectRow={() => onSelectRow(row.session_id)}
                                                    onDeleteRow={() => handleDeleteRow(row.institut_id, row.session_id)}
                                                    onEditRow={() => handleEditRow(row.institut_id, row.session_id)}
                                                    onDetailRow={() => handleDetailRow(row.institut_id, row.session_id)}
                                                    onUsersListRow={() => handleUsersSessionRow(row.institut_id, row.session_id)}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                                            )
                                        )}

                                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={ ( page > 0 && dataFiltered.length === rowsPerPage ) ? 0 : page }
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        //
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content={
                    <>
                        Voulez-vous vraiment supprimer <strong> {selected.length} </strong> session(s) ?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows(selected);
                            handleCloseConfirm();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}
// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName }) {
/*
    const stabilizedThis = inputData.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);
*/
    if (filterName) {
        inputData = inputData.filter((item) => item.Institut.label.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    return inputData;
}