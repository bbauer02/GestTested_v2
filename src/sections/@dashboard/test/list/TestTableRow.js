import PropTypes from 'prop-types';
import { useState } from 'react';
import { paramCase } from 'change-case';
// @mui
import { 
  TableRow, 
  Checkbox, 
  TableCell, 
  Typography, 
  MenuItem, 
  Alert,
  IconButton,
  Button,
  Switch
} from '@mui/material';

// components
import Iconify from "../../../../components/iconify";
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

//
// redux
import { useDispatch } from '../../../../redux/store';
import { deleteExam } from '../../../../redux/slices/exam';
// ----------------------------------------------------------------------

TestTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};
export default function TestTableRow({
 row,
 selected,
 onEditRow,
 onSelectRow,
 onDeleteRow,
}) {
  // eslint-disable-next-line camelcase
  const { label, isInternal } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
   const handleCloseConfirm = () => {
     setOpenConfirm(false);
    };
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
        <TableRow hover selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow} />
            </TableCell>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" noWrap>{label}</Typography>
            </TableCell>
            <TableCell> <Switch  checked={isInternal || false}  disabled />  </TableCell>
            <TableCell> {row.parent ? row.parent.label : "Aucun parent"} </TableCell>
            <TableCell align="right">
                <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            </TableCell>
        </TableRow>

        <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            arrow="right-top"
            sx={{ width: 140 }}
        >
          <MenuItem
              onClick={() => {
                onEditRow();
                handleClosePopover();
              }}
          >
            <Iconify icon='clarity:edit-solid' />
            Edit
          </MenuItem>


          <MenuItem
              onClick={() => {
                  handleOpenConfirm();
                  handleClosePopover();
              }}
              sx={{ color: 'error.main' }}
          >
            <Iconify icon='ep:delete-filled' />
            Delete
          </MenuItem>
        </MenuPopover>

        <ConfirmDialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            title="Suppression d'un test"
            content= "Supprimer définitivement le test et ses données? (Action irréversible)"
            action={
                <Button variant="contained" color="error" onClick={onDeleteRow}>
                    Delete
                </Button>

            }
        />



    </>
  );

}