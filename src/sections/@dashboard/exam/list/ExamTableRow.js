import PropTypes from 'prop-types';
import {useState} from "react";
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    TableRow,
    Checkbox,
    TableCell,
    Typography,
    Chip,
    MenuItem,
    Button, IconButton
} from '@mui/material';
import { blue } from '@mui/material/colors';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';
// redux
import { useDispatch } from '../../../../redux/store';

// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

import Label from '../../../../components/label';
import {PATH_DASHBOARD} from "../../../../routes/paths";

//

// ----------------------------------------------------------------------

ExamTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};
export default function ExamTableRow({
    row,
    onSelectRow,
    onEditRow,
    selected,
    onDeleteRow
})
{
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const navigate = useNavigate();
    // eslint-disable-next-line camelcase
  const { label, isOption, isWritten, price, coeff, nbrQuestions, duration, successScore, exam_id} = row;

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
                  <Typography variant="subtitle2" noWrap>
                      {label}
                  </Typography>
              </TableCell>

              <TableCell>
                  <Chip icon={<TimelineIcon />} label={`${row.Test?.label }  ${row.Level?.label ? `- ${  row.Level?.label}`: ""}`} size="small"   /> <br />
              </TableCell>

              <TableCell>
                  <Iconify
                      icon={isWritten ? 'bi:pen-fill' : 'ooui:user-talk-ltr'}
                      sx={{
                          width: 20,
                          height: 20,
                          color: blue[700],
                      }}
                  />
              </TableCell>
              <TableCell>
                  <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={isOption ? 'success' : 'error'}
                      sx={{ textTransform: 'capitalize' }}
                  >
                      {isOption ? "Optionnel" : "Obligatoire"}
                  </Label>
              </TableCell>
              <TableCell  align="center">
                  {nbrQuestions}
              </TableCell>
              <TableCell  align="center">
                  <Chip icon={<AccessTimeIcon />} size="small" label={duration}   />
              </TableCell>
              <TableCell align="center">
                  {coeff}
              </TableCell>
              <TableCell  align="center">
                  {successScore}
              </TableCell>
              <TableCell  align="center">
                  <Chip icon={<EuroIcon />} size="small" label={price}   />
              </TableCell>
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
                      handleOpenConfirm();
                      handleClosePopover();
                  }}
                  sx={{ color: 'error.main' }}
              >
                  <Iconify icon='eva:trash-2-outline' />
                  Delete
              </MenuItem>
              <MenuItem
                  onClick={() => {
                      onEditRow();
                      handleClosePopover();
                  }}
              >
                  <Iconify icon='eva:edit-fill' />
                  Edit
              </MenuItem>
          </MenuPopover>

          <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              title="Suppression d'un institut"
              content={`Voulez-vous supprimer l'épreuve :  ${row.label} ?`}
              action={
                  <>
                      <Button variant="contained" color="error" onClick={onDeleteRow}>
                          Delete
                      </Button>
                  </>
              }
          />
      </>

  );

}