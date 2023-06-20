import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import {useSnackbar} from "notistack";
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
import { getTests, deleteTest } from '../../redux/slices/test';
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
import { TestTableRow, TestTableToolbar} from "../../sections/@dashboard/test/list";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'label', label: 'Test', align: 'left' },
    { id: 'isInternal', label: 'Test Interne?', align: 'left' },
    { id: 'parent_id', label: 'Test Parent', align: 'left' },
    { id: '' },
];
// ----------------------------------------------------------------------

export default function TestListPage() {
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

    const { tests, isLoading} = useSelector((state) => state.test);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(getTests(true));
    }, [dispatch]);

    useEffect(() => {
        if (tests.length) {
            setTableData(tests);
        }
    }, [tests]);

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
            await dispatch(deleteTest(id));
            enqueueSnackbar('Test supprimé', { variant: 'success' });

        }
        catch (error) {
            enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
        }
    };

    const handleDeleteRows = (selectedRow) => {
            // to DO
    };

    const handleEditRow = (testId) => {
        navigate(PATH_DASHBOARD.admin.test.edit(testId));
    };


    const handleFilterName = (filtername) => {
        setFilterName(filtername);
        setPage(0);
    };


    return (
        <>
            <Helmet>
                <title> Administration: Tests | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des tests"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Tests' }
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={PATH_DASHBOARD.admin.test.create}
                        >
                            Nouveau test
                        </Button>
                    }
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
                                <Tooltip title="Suppression des tests sélectionnés">
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
                                    { (isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <TestTableRow
                                                    key={index}
                                                    row={row}
                                                    selected={selected.includes(row.test_id)}
                                                    onSelectRow={() => onSelectRow(row.test_id)}
                                                    onDeleteRow={() => handleDeleteRow(row.test_id)}
                                                    onEditRow={() => handleEditRow(row.test_id)}
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