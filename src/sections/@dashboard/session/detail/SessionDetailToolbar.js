import PropTypes from 'prop-types';
import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Box,
    Stack,
    Button,
    Dialog,
    Tooltip,
    IconButton,
    DialogActions,
    CircularProgress,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/iconify';
import Label from "../../../../components/label";
//


// ----------------------------------------------------------------------

SessionDetailToobar.propTypes = {
    session: PropTypes.object,
};

export default function SessionDetailToobar({ session }) {
    const { validation } = session;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
       console.log("edit");
    };

    const handleUsersListOpen = () => {
        console.log("users list open");
    }

    return (
        <>
            <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ sm: 'center' }}
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEdit}>
                            <Iconify icon="eva:edit-fill" width={28}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="View">
                        <IconButton onClick={handleUsersListOpen}>
                            <Iconify icon="mdi:users" width={28} />
                        </IconButton>
                    </Tooltip>

                </Stack>

                <Button
                    color={validation ? "primary" : "inherit"}
                    variant="outlined"
                    startIcon={validation ? <Iconify icon="ion:checkmark-done-sharp" /> : <Iconify icon="eva:checkmark-fill" />}
                >
                    {validation? "Session Validée" : "Valider la session" }
                </Button>
            </Stack>

            <Dialog fullScreen open={open}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <DialogActions
                        sx={{
                            zIndex: 9,
                            padding: '12px !important',
                            boxShadow: (theme) => theme.customShadows.z8,
                        }}
                    >
                        <Tooltip title="Close">
                            <IconButton color="inherit" onClick={handleClose}>
                                <Iconify icon="eva:close-fill" />
                            </IconButton>
                        </Tooltip>
                    </DialogActions>

                    <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
                        <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                            PDF
                        </PDFViewer>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
