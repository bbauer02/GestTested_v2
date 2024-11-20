import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// @mui
import {
    Link,
    Stack,
    Button,
    Divider,
    Checkbox,
    TableRow,
    MenuItem,
    TableCell,
    IconButton,
    Typography, Chip,
} from '@mui/material';
import TimelineIcon from "@mui/icons-material/Timeline";


// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import InvoiceTableRow from "../../invoice/list/InvoiceTableRow";
import {fDate} from "../../../../utils/formatTime";

QuestionTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onSelectRow: PropTypes.func,
    onDetailRow: PropTypes.func,
    onEditRow: PropTypes.func,
    onDeleteRow: PropTypes.func
};

export default function QuestionTableRow({
                                             row,
                                             selected,
                                             onSelectRow,
                                             onDetailRow,
                                             onEditRow,
                                             onDeleteRow
                                         }) {

    const { label , question_id , test, level} = row;

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
                <TableCell align="left">{question_id}</TableCell>
                <TableCell align="left">{label}</TableCell>
                <TableCell>
                    <Chip icon={<TimelineIcon />} label={`${test.label} - ${level.label}`} size="small"   />
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
                title="Suppression d'une question"
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
                                <Typography><strong>Supprimer une question? </strong></Typography>
                                <Typography> Cela supprimera définitivement :</Typography>
                                <Typography sx={{ color : "#B76E00"}}>
                                    -<i>La question</i><br />
                                    -<i>Ses références dans un sujet</i><br />
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