import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSnackbar } from 'notistack';
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
    Typography
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// redux
import { useDispatch } from '../../../../redux/store';
import { removeSession} from '../../../../redux/slices/session';
// components
import Iconify from '../../../../components/iconify';
import Label from "../../../../components/label";
import ConfirmDialog from '../../../../components/confirm-dialog';
//


// ----------------------------------------------------------------------

SessionDetailToobar.propTypes = {
    session: PropTypes.object,
};

export default function SessionDetailToobar({ session }) {

    const { institut_id } = useParams();

    const {enqueueSnackbar} = useSnackbar();

    const dispatch = useDispatch();

    const [openConfirm, setOpenConfirm] = useState(false);

    const [openPopover, setOpenPopover] = useState(null);

    const { validation, session_id } = session;

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

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


    const handleDeleteRow = () => {
        try {
            dispatch(removeSession(institut_id,session_id));
            navigate(PATH_DASHBOARD.institut.sessions.root);
        }
        catch (error) {
            enqueueSnackbar( 'impossible de supprimer la session !' );
        }
    };


    // ---------------------------------



    const handleEdit = () => {
        navigate(PATH_DASHBOARD.institut.sessions.edit(session_id))
    };

    const handleUsersListOpen = () => {
        navigate(PATH_DASHBOARD.institut.sessions.addUser(session_id))
    }

    const handleValidateSession = () => {
        console.log("Valider la session")
    }

    return (
        <>
            <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ sm: 'center' }}
                sx={
                    { 
                        px: 3,
                        mb: 3, 
                        pt: 1,
                        pb:1,
                        bgcolor: 'toolbar.background',
                        borderRadius: 2,

                    }
                }


            >
                <Stack direction="row" spacing={0}>
                    <Tooltip title="Editer la session">
                        <IconButton onClick={handleEdit}>
                            <Iconify icon="tabler:edit" width={28}  sx= {{ color: 'toolbar.icon'}} />
                        </IconButton>
                    </Tooltip>




                    <Tooltip title="Ajouter un candidat">
                        <IconButton onClick={handleUsersListOpen}>
                            <Iconify icon="mdi:user-add" width={28}  sx= {{ color: 'toolbar.icon'}} /> 
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Valider la session">
                        <IconButton onClick={handleValidateSession}>
                            <Iconify icon="grommet-icons:validate" width={28}  sx= {{ color: 'toolbar.icon'}} /> 
                        </IconButton>
                    </Tooltip>

                </Stack>




                    <Tooltip title="Supprimer">
                        <IconButton onClick={() => {
                        handleOpenConfirm();
                        handleClosePopover();
                    }}
                    sx= {{ color: 'toolbar.iconError'}}>
                            <Iconify icon="material-symbols:delete" width={28}  sx= {{ color: 'toolbar.iconError'}} /> 
                            Supprimer
                        </IconButton>
                    </Tooltip>
            </Stack>

            
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
                    <Button variant="contained" color="error" onClick={handleDeleteRow}>
                        Supprimer définitivement
                    </Button>

                }
            />
        </>
    );
}
