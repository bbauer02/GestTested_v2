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
  Button
} from '@mui/material';

// components
import Iconify from "../../../../components/iconify";
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
//

// ----------------------------------------------------------------------

InstitutTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDetailRow: PropTypes.func,
  onUsersListRow: PropTypes.func,
  onExaminatorsListRow: PropTypes.func,
  onSessionsListRow: PropTypes.func,
  onPricesListRow: PropTypes.func

};
export default function InstitutTableRow({
 row,
 selected,
 onEditRow,
 onSelectRow,
 onDeleteRow,
 onDetailRow,
 onUsersListRow,
 onExaminatorsListRow,
 onSessionsListRow,
 onPricesListRow
}) {
  // eslint-disable-next-line camelcase
  const { label, city, phone, email, institutCountry: { label : country } } = row;

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
            <TableCell> <Iconify icon={`twemoji:flag-${paramCase(country)}`} /> {country} </TableCell>
            <TableCell> {city} </TableCell>
            <TableCell> {email} </TableCell>
            <TableCell> {phone} </TableCell>
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
                onDetailRow();
                  handleClosePopover();
              }}
          >
            <Iconify icon='icon-park-outline:doc-detail' />
            Détail
          </MenuItem>


          <MenuItem
              onClick={() => {
                onUsersListRow();
                  handleClosePopover();
              }}
          >
            <Iconify icon='clarity:users-solid' />
            Inscrits
          </MenuItem>


          <MenuItem
              onClick={() => {
                onExaminatorsListRow();
                  handleClosePopover();
              }}
          >
            <Iconify icon='fa-solid:chalkboard-teacher' />
            Examinateurs
          </MenuItem>


          <MenuItem
              onClick={() => {
                onSessionsListRow();
                  handleClosePopover();
              }}
          >
            <Iconify icon='entypo:price-ribbon' />
            Sessions
          </MenuItem>

          <MenuItem
              onClick={() => {
                onPricesListRow();
                  handleClosePopover();
              }}
          >
            <Iconify icon='ic:baseline-euro' />
            Tarifs
          </MenuItem>


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
            title="Suppression d'un institut"
            content= "Supprimer définitivement l'institut et ses données? (Action irréversible)"
            action={
                <Button variant="contained" color="error" onClick={onDeleteRow}>
                    Delete
                </Button>

            }
        />



    </>
  );

}