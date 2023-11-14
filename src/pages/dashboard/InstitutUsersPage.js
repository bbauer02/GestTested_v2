import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Tab,
    Tabs,
    Card,
    Table,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
  } from '@mui/material';
  // Redux
import { useDispatch, useSelector } from "react-redux";
import { getUsersByInstitut } from "../../redux/slices/user";
//
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
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

// Sections

import { InstitutUsersTableRow, InstitutUsersTableToolbar } from '../../sections/@dashboard/institutUsers/list';

const TABLE_HEAD = [
    { id: 'lastname', label: 'Nom', align: 'left' },
    { id: 'firstname', label: 'Prénom', align: 'left' },
    { id: '' },
  ];

  
export default function InstitutUsersPage() {
    // Logic here to get current user role
    const { user } = useAuthContext();
    const { usersInstitut } = useSelector((state) => state.user);
    const institut_id = user.instituts[0].institut_id;
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getUsersByInstitut(institut_id));
    }, [dispatch, institut_id])



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
      } = useTable();
    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);
  
    const [openConfirm, setOpenConfirm] = useState(false);
  
    const [filterName, setFilterName] = useState('');

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,

      });

      const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      const denseHeight = dense ? 52 : 72;
    
      const isFiltered = filterName !== '';
    
      const isNotFound =
        (!dataFiltered.length && !!filterName);

        useEffect(() => {
            setTableData(usersInstitut)
        }, [usersInstitut])
    
      const handleOpenConfirm = () => {
        setOpenConfirm(true);
      };
    
      const handleCloseConfirm = () => {
        setOpenConfirm(false);
      };
    
 
      const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
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

      const handleDeleteRows = (selectedRows) => {
        const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);
    
        if (page > 0) {
          if (selectedRows.length === dataInPage.length) {
            setPage(page - 1);
          } else if (selectedRows.length === dataFiltered.length) {
            setPage(0);
          } else if (selectedRows.length > dataInPage.length) {
            const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
            setPage(newPage);
          }
        }
      };

      const handleEditRow = (id) => {
        console.log("handleEditRow");
      };
    

      const handleResetFilter = () => {
        setFilterName('');
      };

      
    return (
        <>
            <Helmet>
                <title> Institut: Liste des utilisateurs | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Liste des utilisateurs d'un institut"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: "Utilisateurs d'un institut" }
                    ]}
                />
                <Card>


                    <Divider />

                    <InstitutUsersTableToolbar
                        isFiltered={isFiltered}
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        onResetFilter={handleResetFilter}
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
                            <Tooltip title="Delete">
                            <IconButton color="primary" onClick={handleOpenConfirm}>
                                <Iconify icon="eva:trash-2-outline" />
                            </IconButton>
                            </Tooltip>
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
                                <InstitutUsersTableRow
                                    key={row.user_id}
                                    row={row}
                                    selected={selected.includes(row.id)}
                                    onSelectRow={() => onSelectRow(row.id)}
                                    onDeleteRow={() => handleDeleteRow(row.id)}
                                    onEditRow={() => handleEditRow(row.name)}
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

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content={
                <>
                    Are you sure want to delete <strong> {selected.length} </strong> items?
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

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    inputData = stabilizedThis.map((el) => el[0]);
  
    if (filterName) {
      inputData = inputData.filter(
        (user) => {
            const resulName = user.lastname.toLowerCase().indexOf(filterName.toLowerCase()) 
            const resulfirstname = user.firstname.toLowerCase().indexOf(filterName.toLowerCase()) 

            if(resulName !== -1) {
                return true
            } 
            if (resulfirstname !== -1) {
                return true;
            }


            return false
            
        }
      );
      console.log(inputData)
    }

    return inputData;
  }
  