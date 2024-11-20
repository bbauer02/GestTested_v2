import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from "react";
import { useSnackbar } from 'notistack';
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

import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// components
import { useSettingsContext } from '../../components/settings';
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
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
import { QuestionTableToolbar, QuestionTableRow } from '../../sections/@dashboard/questions/list'

// SLICES
import { useAuthContext } from '../../auth/useAuthContext';
import { getQuestions, removeQuestion } from "../../redux/slices/question";
import {getTests} from "../../redux/slices/test";

import {getSkills} from "../../redux/slices/skill";

import {fTimestamp} from "../../utils/formatTime";
import {removeSession} from "../../redux/slices/session";
import {SessionTableToolbar} from "../../sections/@dashboard/session/list";


const TABLE_HEAD = [
    { id: 'question_id', label: '#', align: 'left' , width: 50},
    { id: 'label', label: 'Question', align: 'left' },
    { id: 'test', label: 'Test / Niveau', align: 'left' },
    { id: 'action', label: 'Action', align: 'left' },
    { id: '' },
];
export default function QuestionListPage() {
    const theme = useTheme();
    const { themeStretch } = useSettingsContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questions } = useSelector((state) => state.question);
    const { tests } = useSelector((state) => state.test);
    const { skills } = useSelector((state) => state.skill);
    const [tableData, setTableData] = useState([]);

    const [filterTest, setFilterTest] = useState('all');
    const [optionsTest, setOptionsTest] = useState([]);

    const [optionsLevel, setOptionsLevel] = useState([]);
    const [filterLevel, setFilterLevel] = useState('all');

    const [selectedSkills, setSelectedSkills] =  useState([]);

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        dispatch(getTests(true));
    }, [dispatch]);

    useEffect(() => {
        setOptionsTest(tests);
    }, [tests]);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch])

    useEffect(() => {
        dispatch(getSkills());
    }, [dispatch])

    useEffect(() => {
        setSelectedSkills(skills);
    }, [skills]);

    useEffect(() => {
        setTableData(questions);
    }, [questions]);

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
    } = useTable({ defaultOrderBy: 'question_id', defaultRowsPerPage: 10, defaultOrder:'desc' });

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 56 : 76;

    const isNotFound = (!dataFiltered.length);



    const isFiltered =
        filterLevel !== 'all' ||
        filterTest !== 'all';




    const handleDetailRow = (questionId) => {
        navigate(PATH_DASHBOARD.questions.detail(questionId));
    };
    const handleEditRow = (questionId) => {
        navigate(PATH_DASHBOARD.questions.edit(questionId));
    };
    const handleDeleteRow = (questionId) => {
        try {
            dispatch(removeQuestion(questionId));
            enqueueSnackbar( 'Suppression de la question effectuée !' );
        }
        catch (error) {
            enqueueSnackbar( 'impossible de supprimer la question !' );
        }
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

    const handleResetFilter = () => {
        setFilterLevel('all');
        setFilterTest('all');
    };

    const handleSkillFilter = (values) => {
        console.log(values)
    }

    return (
        <>
            <Helmet>
                <title> Questions: Liste | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Liste des questions de tests"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Questions' }
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={PATH_DASHBOARD.questions.create}
                        >
                            Nouvelle Question
                        </Button>
                    }
                />
                <Card>
                    <QuestionTableToolbar
                        isFiltered={isFiltered}
                        filterTest={filterTest}
                        onFilterTest = {handleTestFilter}
                        optionsTest = {optionsTest}
                        filterLevel={filterLevel}
                        onFilterLevel = {handleLevelFilter}
                        optionsLevel = {optionsLevel}
                        onResetFilter={handleResetFilter}
                        optionsSkill = {skills}
                        onFilterSkill = {handleSkillFilter}
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
                                            <QuestionTableRow
                                                key={row.question_id}
                                                row={row}
                                                selected={selected.includes(row.question_id)}
                                                onSelectRow={() => onSelectRow(row.question_id)}
                                                onDetailRow={() => handleDetailRow(row.question_id)}
                                                onEditRow={() => handleEditRow(row.question_id)}
                                                onDeleteRow={() => handleDeleteRow(row.question_id)}
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
        </>
    );
}




function applyFilter({
                         inputData,
                         comparator,
                     }) {

    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    inputData = stabilizedThis.map((el) => el[0]);

    return inputData;
}