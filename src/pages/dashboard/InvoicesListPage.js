import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from "react";
import sumBy from 'lodash/sumBy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";

// @mui
import { useTheme } from '@mui/material/styles';
import {
    Tab,
    Tabs,
    Card,
    Table,
    Stack,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fTimestamp } from '../../utils/formatTime';

// SLICES
import { getInvoices } from "../../redux/slices/invoice";
import { getTests } from "../../redux/slices/test";


// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';
//
import { useAuthContext } from '../../auth/useAuthContext';

const TABLE_HEAD = [
    { id: 'ref_invoice', label: 'Référence', align: 'left' },
    { id: 'createDate', label: 'Création', align: 'left' },
    { id: 'dueDate', label: 'Echéance', align: 'left' },
    { id: 'amount_ttc', label: 'Montant TTC', align: 'center', width: 140 },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];
export default function InvoicesListPage() {

    const theme = useTheme();
    const { themeStretch } = useSettingsContext();
    const { user } = useAuthContext();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const institut_id = user.instituts[0].institut_id;
    const { invoices } = useSelector((state) => state.invoice);
    const { tests } = useSelector((state) => state.test);


    const [tableData, setTableData] = useState([]);
    const [optionsTest, setOptionsTest] = useState([]);
    const [optionsLevel, setOptionsLevel] = useState([]);

    const [filterName, setFilterName] = useState('');
    const [filterTest, setFilterTest] = useState('all');
    const [filterLevel, setFilterLevel] = useState('all');
    const [filterStartDate, setFilterStartDate] = useState(null);
    const [filterEndDate, setFilterEndDate] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        dispatch(getInvoices(institut_id));
    }, [dispatch, institut_id])

    useEffect(() => {
        dispatch(getTests(true));
    }, [dispatch]);

    useEffect(() => {
        setOptionsTest(tests);
    }, [tests]);

    useEffect(() => {
        setTableData(invoices);
    }, [invoices]);

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
    } = useTable({ defaultOrderBy: 'ref_invoice', defaultRowsPerPage: 10, defaultOrder:'desc' });




    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterTest,
        filterLevel,
        filterStartDate,
        filterEndDate,
        filterStatus
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 56 : 76;

    const handleEditRow = (id) => {
        console.log(id);
    };
    const handleViewRow = (id) => {
        navigate(PATH_DASHBOARD.institut.invoices.view(id));
    };
    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setSelected([]);
        setTableData(deleteRow);

        if (page > 0) {
            if (dataInPage.length < 2) {
                setPage(page - 1);
            }
        }
    };

    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };
    const handleResetFilter = () => {
        setFilterName('');
        setFilterEndDate(null);
        setFilterStartDate(null);
        setFilterLevel('all');
        setFilterTest('all');
        setFilterStatus('all');
    };

    const handleTestFilter = (event) => {
        setPage(0);
        setFilterTest(event.target.value);
        setFilterLevel('all');
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


    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterTest) ||
        (!dataFiltered.length && !!filterLevel) ||
        (!dataFiltered.length && !!filterEndDate) ||
        (!dataFiltered.length && !!filterStartDate) ||
        (!dataFiltered.length && !!filterStatus);

    const isFiltered =
        filterStatus !== 'all' ||
        filterLevel !== 'all' ||
        filterName !== '' ||
        filterTest !== 'all' ||
        (!!filterStartDate && !!filterEndDate);

    const getLengthByStatus = (status) => tableData?.filter((item) => item.status === status).length;
    const getTotalPriceByStatus = (status) =>
        sumBy(
            tableData.filter((item) => item.status === status),
            data =>  data.amount_ttc
        );
    const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

    const TABS = [
        { value: 'all', label: 'All', color: 'info', count: tableData.length },
        { value: 1, label: 'Payé', color: 'success', count: getLengthByStatus(1) },
        { value: 0, label: 'Non payé', color: 'warning', count: getLengthByStatus(0) },
        { value: 2, label: 'Retard', color: 'error', count: getLengthByStatus(2) },
        { value: 3, label: 'Brouillon', color: 'default', count: getLengthByStatus(3) },
    ];

    const handleFilterStatus = (event, newValue) => {
        setPage(0);
        setFilterStatus(newValue);
    };

    return (
        <>
            <Helmet>
                <title> Factures : Liste | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Liste des factures de l'institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Factures' }
                    ]}
                />
                <Card sx={{ mb: 5 }}>
                    <Scrollbar>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                            sx={{ py: 2 }}
                        >
                            <InvoiceAnalytic
                                title="Total"
                                total={tableData.length}
                                percent={100}
                                price={sumBy(tableData, data =>  data.amount_ttc)}
                                icon="ic:round-receipt"
                                color={theme.palette.info.main}
                            />

                            <InvoiceAnalytic
                                title="Payé"
                                total={getLengthByStatus(1)}
                                percent={getPercentByStatus(1)}
                                price={getTotalPriceByStatus(1)}
                                icon="eva:checkmark-circle-2-fill"
                                color={theme.palette.success.main}
                            />

                            <InvoiceAnalytic
                                title="Non Payé"
                                total={getLengthByStatus(0)}
                                percent={getPercentByStatus(0)}
                                price={getTotalPriceByStatus(0)}
                                icon="eva:clock-fill"
                                color={theme.palette.warning.main}
                            />

                            <InvoiceAnalytic
                                title="Retard"
                                total={getLengthByStatus(2)}
                                percent={getPercentByStatus(2)}
                                price={getTotalPriceByStatus(2)}
                                icon="eva:bell-fill"
                                color={theme.palette.error.main}
                            />

                            <InvoiceAnalytic
                                title="Brouillon"
                                total={getLengthByStatus(3)}
                                percent={getPercentByStatus(3)}
                                price={getTotalPriceByStatus(3)}
                                icon="eva:file-fill"
                                color={theme.palette.text.secondary}
                            />
                        </Stack>
                    </Scrollbar>
                </Card>
                <Card>
                    <Tabs
                        value={filterStatus}
                        onChange={handleFilterStatus}
                        sx={{
                            px: 2,
                            bgcolor: 'background.neutral',
                        }}
                    >
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                value={tab.value}
                                label={tab.label}
                                icon={
                                    <Label color={tab.color} sx={{ mr: 1 }}>
                                        {tab.count}
                                    </Label>
                                }
                            />
                        ))}
                    </Tabs>
                    <Divider />

                    <InvoiceTableToolbar
                        filterName={filterName}
                        isFiltered={isFiltered}
                        onFilterName={handleFilterName}
                        onResetFilter={handleResetFilter}
                        filterTest={filterTest}
                        onFilterTest = {handleTestFilter}
                        optionsTest = {optionsTest}
                        filterLevel={filterLevel}
                        onFilterLevel = {handleLevelFilter}
                        optionsLevel = {optionsLevel}
                        onFilterStartDate={(newValue) => {
                            setFilterStartDate(newValue);
                        }}
                        onFilterEndDate={(newValue) => {
                            setFilterEndDate(newValue);
                        }}
                        filterStartDate={filterStartDate}
                        filterEndDate={filterEndDate}

                    />
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }
                            action={
                                <Stack direction="row">
                                    <Tooltip title="Download">
                                        <IconButton color="primary">
                                            <Iconify icon="eva:download-outline" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Print">
                                        <IconButton color="primary">
                                            <Iconify icon="eva:printer-fill" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton color="primary" onClick={()=>console.log("delete")}>
                                            <Iconify icon="eva:trash-2-outline" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            }
                        />
                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <InvoiceTableRow
                                                key={row.invoice_id}
                                                row={row}
                                                selected={selected.includes(row.invoice_id)}
                                                onSelectRow={() => onSelectRow(row.invoice_id)}
                                                onViewRow={() => handleViewRow(row.invoice_id)}
                                                onEditRow={() => handleEditRow(row.invoice_id)}
                                                onDeleteRow={() => handleDeleteRow(row.invoice_id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        //
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />

                </Card>
            </Container>
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({
                         inputData,
                         comparator,
                         filterName,
                         filterTest,
                         filterLevel,
                         filterStartDate,
                         filterEndDate,
                         filterStatus

                     }) {

    const stabilizedThis = inputData.map((el, index) => [el, index]);


    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter(
            (invoice) =>
                invoice.ref_invoice.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                invoice.customerLastname.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                invoice.customerFirstname.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    if(filterTest !== "all" && filterLevel==="all") {
        inputData = inputData.filter((invoice) =>invoice.test === filterTest);
    }
    else if(filterTest !== "all" && filterLevel!=="all") {
        inputData = inputData.filter((invoice) =>invoice.test === filterTest && invoice.level === filterLevel);
    }

    if (filterStatus !== 'all') {
        inputData = inputData.filter((invoice) => invoice.status === filterStatus);
    }

    if (filterStartDate && filterEndDate) {
        inputData = inputData.filter((invoice) =>
                fTimestamp(invoice.createDate) >= fTimestamp(filterStartDate) &&
                fTimestamp(invoice.createDate) <= fTimestamp(filterEndDate)
        );
    }

    return inputData;
}
