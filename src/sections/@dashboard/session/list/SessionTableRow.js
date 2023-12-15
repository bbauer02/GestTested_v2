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
    Button, Chip,Stack

} from '@mui/material';
import TimelineIcon from "@mui/icons-material/Timeline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";

// components
import Iconify from "../../../../components/iconify";
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';



//

// ----------------------------------------------------------------------

SessionTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onDetailRow: PropTypes.func,
    onUsersListRow: PropTypes.func,
};
export default function SessionTableRow({
                                             row,
                                             selected,
                                             onEditRow,
                                             onSelectRow,
                                             onDeleteRow,
                                             onDetailRow,
                                             onUsersListRow
                                         }) {
    // eslint-disable-next-line camelcase
    const { Institut, Level, Test, start, validation, session_id, duration, sessionUsers, placeAvailable, institut_id} = row;

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
                    <Typography variant="subtitle2" noWrap>{session_id}</Typography>
                </TableCell>
                <TableCell>   {Institut?.label? Institut?.label: "Inconnu"} </TableCell>
                <TableCell>
                    <Chip icon={<AccessTimeIcon />} size="small" label={new Date(start).toLocaleString([], {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}   />
                </TableCell>
                <TableCell>
                    <Chip icon={<TimelineIcon />} label={`${row.Test?.label }  ${row.Level?.label ? `- ${  row.Level?.label}`: ""}`} size="small"   />
                </TableCell>
                <TableCell>
                    <Chip icon={<GroupIcon />} label={`${sessionUsers.length} / ${placeAvailable}` }/>
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
                        onDetailRow();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon='icon-park-outline:view-grid-detail' />
                    Détails
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        onUsersListRow();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon='mdi:users' />
                    Candidats
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
                title="Suppression d'une session"
                content= {
                    <>  
                        <Stack 
                            spacing={2}
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ sm: 'center' }}
                        >
                            <Stack direction="row" spacing={0}>
                                <Iconify icon='material-symbols:warning' width={72} sx= {{ color: '#B76E00'}} />
                            </Stack>
                            <Stack direction="column" spacing={0}>
                                <Typography><strong>Supprimer une session et ses données? </strong></Typography>
                                <Typography> Cela supprimera définitivement :</Typography>
                                <Typography sx={{ color : "#B76E00"}}>
                                -<i>Les informations de la session</i><br /> 
                                -<i>Les utilisateurs de la session</i><br /> 
                                - <i>Les épreuves de la session</i><br /> <br /> 

                                </Typography>
                               
                            </Stack>
                        </Stack>
                    </>
                }
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Supprimer définitivement
                    </Button>

                }
            />



        </>
    );

}