import {useState, useEffect} from "react";
import {useSnackbar} from "notistack";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import {
    Container,
    Card, TableContainer, Tooltip, IconButton, Table, TableBody, Button
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {deleteExam, getExams} from '../../redux/slices/exam';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import Iconify from "../../components/iconify";
import {
    emptyRows,
    getComparator,
    TableEmptyRows,
    TableHeadCustom, TableNoData, TablePaginationCustom,
    TableSelectedAction,
    TableSkeleton,
    useTable
} from "../../components/table";
import Scrollbar from "../../components/scrollbar";
import {ExamTableRow, ExamTableToolbar} from "../../sections/@dashboard/exam/list";



// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: 'label', label: 'Epreuve', align: 'left' },
    { id: 'test', label: 'Test / Niveau', align: 'left' },
    { id: 'type', label: 'Type', align: 'left' },
    { id: 'optionnal', label: 'Status', align: 'left' },
    { id: 'questions', label: 'Nb Questions', align: 'center' },
    { id: 'duration', label: 'Durée(min.)', align: 'center' },
    { id: 'coeff', label: 'Coeff.', align: 'center' },
    { id: 'score', label: 'Score', align: 'center' },
    { id: 'price', label: 'Prix', align: 'center' },
    { id: 'action', label: 'Action', align: 'center' },
];
export default function ExamListPage() {
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
    const { enqueueSnackbar } = useSnackbar();

    const { exams, isLoading } = useSelector((state) => state.exam);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');
    const [filterTags, setFilterTags] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    useEffect(() => {
        dispatch(getExams());
    }, [dispatch]);


    useEffect(() => {
        if (exams.length) {
            setTableData(exams);
        }

    }, [exams]);

    const dataFiltered = applyFilter({
        inputData : tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterTags
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

    const handleFilterName = (name) => {
        setPage(0);
        setFilterName(name);
    };

    const handleFilterTags = (tags) => {
        setPage(0);
        setFilterTags(tags);
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.admin.exam.edit(id));
    }

    const handleDeleteRow = async (id) => {
        try {
            await dispatch(deleteExam(id));
            enqueueSnackbar('Examen supprimé', { variant: 'success' });
        }
        catch (error) {
            enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
        }
    }
    return (
        <>
            <Helmet>
                <title> Administration: Epreuves | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Administration des épreuves"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Liste des épreuves' }
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={PATH_DASHBOARD.admin.exam.create}
                        >
                            Nouvelle épreuve
                        </Button>
                    }
                />
                <Card>
                    <ExamTableToolbar
                        filterName={filterName}
                        filterTags={filterTags}
                        onFilterTags={handleFilterTags}
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
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={handleOpenConfirm}>
                                        <Iconify icon='eva:trash-2-outline' />
                                    </IconButton>
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
                                            tableData.map((row) => row.exam_id)
                                        )
                                    }
                                />
                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <ExamTableRow
                                                    key={row.exam_id}
                                                    row={row}
                                                    selected={selected.includes(row.exam_id)}
                                                    onSelectRow={() => onSelectRow(row.exam_id)}
                                                    onDeleteRow={() => handleDeleteRow(row.exam_id)}
                                                    onEditRow={() => handleEditRow(row.exam_id)}
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

function applyFilter({ inputData, comparator, filterName, filterTags }) {
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

    if(filterTags.length && filterTags.length >0) {
        const tags = filterTags.map(tag => tag.test_id);
        inputData = inputData.filter((item) => tags.includes(item.Test.test_id));
    }

    return inputData;
}