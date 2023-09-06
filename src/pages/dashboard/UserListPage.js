import { Helmet } from 'react-helmet-async';
// @mui
import {
    Container,
    Card, Button, TableContainer, Tooltip, IconButton, Table, TableBody
} from '@mui/material';

import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import { useSettingsContext } from '../../components/settings';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/user';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
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
// sections
import { TestTableRow, TestTableToolbar} from "../../sections/@dashboard/test/list";

import {UserTableRow} from "../../sections/@dashboard/user/list";


const TABLE_HEAD = [
    { id: 'lastname', label: 'nom', align: 'left' },
    { id: 'institut', label: 'Institut', align: 'left' },
    { id: 'institutRole', label: 'Rôle dans l\'institut', align: 'left' },
    { id: 'systemRole', label: 'Rôle système', align: 'left' },
    { id: '' },
];
export default function UserListPage() {
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
        defaultOrderBy: 'lastname',
    });
    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { users, isLoading} = useSelector((state) => state.user);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length) {
            setTableData(users);
        }
    }, [users]);

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
    const handleDeleteRow = async (id) => {
        try {
         // TODO

        }
        catch (error) {
            enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
        }
    };

    const handleDeleteRows = (selectedRow) => {
        // to DO
    };

    const handleEditRow = (testId) => {
        // TODO
    };


    const handleFilterName = (filtername) => {
        setFilterName(filtername);
        setPage(0);
    };

    return (
        <>
            <Helmet>
                <title> Administration: Utilisateurs | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des utilisateurs"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Utilisateurs' }
                    ]}
                />
                <Card>
                    <TestTableToolbar
                        filterName={filterName}
                        onFilterName={handleFilterName}
                    />

                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.institut_id)
                                )
                            }
                            action={
                                <Tooltip title="Suppression des utilisateurs sélectionnés">
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
                                            tableData.map((row) => row.user_id)
                                        )
                                    }
                                />
                                <TableBody>
                                    { (isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <UserTableRow
                                                    key={index}
                                                    row={row}
                                                    selected={selected.includes(row.user_id)}
                                                    onSelectRow={() => onSelectRow(row.user_id)}
                                                    onDeleteRow={() => handleDeleteRow(row.user_id)}
                                                    onEditRow={() => handleEditRow(row.user_id)}
                                                />
                                            ) : (
                                                !isNotFound && ""
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
                        Voulez-vous vraiment supprimer <strong> {selected.length} </strong> utilisateurs ?
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

        const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter((item) => item.lastname.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }
    return inputData;
}