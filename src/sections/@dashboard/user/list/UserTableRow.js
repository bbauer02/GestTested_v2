import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
    TableRow,
    Checkbox,
    TableCell,
    Typography,
    MenuItem,
    Stack,
    IconButton,
    Button,
    Avatar
} from '@mui/material';

// components
import Iconify from "../../../../components/iconify";
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';


UserTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};
export default function UserTableRow({
                                         row,
                                         selected,
                                         onEditRow,
                                         onSelectRow,
                                         onDeleteRow,
                                     }) {
    // eslint-disable-next-line camelcase
    const { firstname, lastname, email, avatar, instituts, systemRole: {label: systemRole} } = row;
    const { Institut : {label : institutLabel},  Role: {label: institutRole} } = instituts[0];
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
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={lastname} src={avatar? `/avatars/${avatar}` : ''} />

                        <Typography variant="subtitle2" noWrap>
                            {lastname} {firstname}
                        </Typography>

                    </Stack>
                    
                </TableCell>
                <TableCell> {institutLabel} </TableCell>
                <TableCell> {institutRole} </TableCell>
                <TableCell> {systemRole} </TableCell>

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
                title= "Suppression d'un utilisateur"
                content= "Supprimer définitivement utilisateur et ses données? (Action irréversible)"
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Delete
                    </Button>

                }
            />
        </>
    );

}