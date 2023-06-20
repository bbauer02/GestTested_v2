import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getInstituts } from '../../redux/slices/institut';
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
import { InstitutTableRow, InstitutTableToolbar} from "../../sections/@dashboard/institut/list";
// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'label', label: 'Institut', align: 'left' },
    { id: 'institutCountry', label: 'Pays', align: 'left' },
    { id: 'city', label: 'Ville', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'phone', label: 'Téléphone', align: 'left' },
    { id: '' },
];
// ----------------------------------------------------------------------

export default function InstitutListPage() {
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
    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { instituts, isLoading} = useSelector((state) => state.institut);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
        dispatch(getInstituts());
    }, [dispatch]);

    useEffect(() => {
        if (instituts.length) {
            setTableData(instituts);
        }
    }, [instituts]);

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
    const handleDeleteRow = (id) => {
        // dispatch(deleteInstitut(id));
    };

    const handleDeleteRows = (selectedRow) => {
        // const deleteRows = tableData.filter((row) => !selectedRow.includes(row.institut_id));
        // setSelected([]);
        // setTableData(deleteRows);
    };

    const handleEditRow = (institutId) => {
        navigate(PATH_DASHBOARD.admin.institut.edit(institutId));
    };

    const handleDetailRow = (institutId) => {
       navigate(PATH_DASHBOARD.admin.institut.details(institutId));
    };

    const handleUsersList = (institutId) => {
      navigate(PATH_DASHBOARD.admin.institut.users(institutId));
    };

    const handleExaminatorsList = (institutId) => {
      navigate(PATH_DASHBOARD.admin.institut.examinators(institutId));
    };

    const handleSessionsList = (institutId) => {
       navigate(PATH_DASHBOARD.admin.institut.sessions(institutId));
    };

    const handlePricesList = (institutId) => {
      navigate(PATH_DASHBOARD.admin.institut.prices(institutId));
    };

    const handleFilterName = (filtername) => {
        setFilterName(filtername);
        setPage(0);
    };


    return (
        <>
            <Helmet>
                <title> Administration: Instituts | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des instituts"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Instituts' }
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={PATH_DASHBOARD.admin.institut.create}
                        >
                            Nouvel Institut
                        </Button>
                    }
                />
                <Card>
                    <InstitutTableToolbar
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
                                                <InstitutTableRow
                                                    key={row.institut_id}
                                                    row={row}
                                                    selected={selected.includes(row.institut_id)}
                                                    onSelectRow={() => onSelectRow(row.institut_id)}
                                                    onDeleteRow={() => handleDeleteRow(row.institut_id)}
                                                    onEditRow={() => handleEditRow(row.institut_id)}
                                                    onDetailRow={() => handleDetailRow(row.institut_id)}
                                                    onUsersListRow={() => handleUsersList(row.institut_id)}
                                                    onExaminatorsListRow={() => handleExaminatorsList(row.institut_id) }
                                                    onSessionsListRow={() => handleSessionsList(row.institut_id)}
                                                    onPricesListRow={() => handlePricesList(row.institut_id)}
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
                        Voulez-vous vraiment supprimer <strong> {selected.length} </strong> instituts ?
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
        inputData = inputData.filter((item) => item.label.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    return inputData;
}