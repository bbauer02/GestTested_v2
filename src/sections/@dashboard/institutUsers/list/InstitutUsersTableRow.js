import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  Paper,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';


// utils

import { fDateTime_fr} from "../../../../utils/formatTime";
import {PATH_DASHBOARD} from "../../../../routes/paths";

// ----------------------------------------------------------------------
const StyledListContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`,
}));
//----------------------------------------------------------------------


InstitutUsersTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function InstitutUsersTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { avatar, lastname, firstname, Role} = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const [openDetail, setOpenDetail] = useState(false);

  const navigate = useNavigate();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setOpenPopover(null);
  }
  const handleOpenDetail = () => {
    setOpenDetail(true);
  }
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleSessionUserDetail = (session_id, user_id) => {
    navigate(PATH_DASHBOARD.session.user(session_id, user_id));
  }


  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={lastname} src={avatar} />

            <Typography variant="subtitle2" noWrap>
              {lastname}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{firstname}</TableCell>

        <TableCell align="left">{Role.label}</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
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
              handleOpenDetail();
            }}
        >
          <Iconify icon="fontisto:zoom" />
            Sessions
        </MenuItem>

        <Dialog open={openDetail} onClose={handleCloseDetail}>
          <DialogTitle>Liste des sessions où est inscrit le candidat</DialogTitle>
          <DialogContent style={ { paddingBottom:30}}>
            <StyledListContainer >
              <List component="nav" aria-label="main mailbox folders">
              {
                row.sessionUsers.length > 0 ?

                        row.sessionUsers.map((sessionUser) =>
                                          <ListItemButton key={sessionUser.sessionUser_id} onClick={() => handleSessionUserDetail(sessionUser.session_id,sessionUser.user_id)}>
                                            <ListItemIcon>
                                              <Iconify icon="ic:baseline-inbox" width={24} />
                                            </ListItemIcon>
                                           <ListItemText primary={`Session de ${sessionUser.Session.Test.label} ${sessionUser.Session.Level? `- ${sessionUser.Session.Level.label}` : "" } du ${fDateTime_fr(sessionUser.Session.start, "dd/MM/YYY")} au ${fDateTime_fr(sessionUser.Session.end, "dd/MM/YYY")} `} />
                                        </ListItemButton>
                         )

                    :
                    (
                        <ListItemButton onClick={handleCloseDetail}>
                          <ListItemIcon>
                            <Iconify icon="typcn:warning" width={24} />
                          </ListItemIcon>
                          <ListItemText primary="L'utilisateur est inscrit dans aucune session." />
                        </ListItemButton>
                    )
              }
              </List>
            </StyledListContainer>
          </DialogContent>

        </Dialog>

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
          disabled
        >
          <Iconify icon="eva:trash-2-outline" />
          Supprimer
        </MenuItem>

      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Supprimer"
        content="Voulez-vous supprimez cet utilisateur ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer définitivement
          </Button>
        }
      />
    </>
  );
}
