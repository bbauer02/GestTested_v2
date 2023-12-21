import PropTypes from 'prop-types';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
import {fDateTime_fr} from '../../../../utils/formatTime';

// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import SvgColor from '../../../../components/svg-color';
import ConfirmDialog from '../../../../components/confirm-dialog';

import {PATH_DASHBOARD} from "../../../../routes/paths";



// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
    top: 0,
    left: 0,
    zIndex: 8,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

SessionCard.propTypes = {
    session: PropTypes.object,
    onValidate: PropTypes.func
};

export default function SessionCard({ session, onValidate }) {
    const navigate = useNavigate();
    const { Institut, Level, Test, start, end, placeAvailable, sessionUsers, validation, institut_id, session_id } = session;

    const [openConfirmValidation, setOpenConfirmValidation] = useState(false);

    const [openPopoverValidation, setOpenPopoverValidation] = useState(null);

    const handleOpenConfirmValidation = () => {
        setOpenConfirmValidation(true);
    };
    const handleCloseConfirmValidation = () => {
        setOpenConfirmValidation(false);
    };
    const handleOpenPopoverValidation = (event) => {
        setOpenPopoverValidation(event.currentTarget);
    };

    const handleClosePopoverValidation = () => {
        setOpenPopoverValidation(null);
    };

    const handleDetails = ( ) => {
        navigate(PATH_DASHBOARD.session.detail(institut_id,session_id));
    }
    return (
        <>
            <Card sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                    <SvgColor
                        src="/assets/shape_avatar.svg"
                        sx={{
                            width: 144,
                            height: 62,
                            zIndex: 10,
                            left: 0,
                            right: 0,
                            bottom: -26,
                            mx: 'auto',
                            position: 'absolute',
                            color: 'background.paper',
                        }}
                    />

                    <Avatar
                        alt={Institut?.label}
                        src=""
                        sx={{
                            width: 64,
                            height: 64,
                            zIndex: 11,
                            left: 0,
                            right: 0,
                            bottom: -32,
                            mx: 'auto',
                            position: 'absolute',
                        }}
                    >{Level?.label? Level?.label : Test?.label}</Avatar>

                    <StyledOverlay />

                    <Image src="" alt="" ratio="16/9" />
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
                    {Test?.label}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Du { fDateTime_fr(start)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Au { fDateTime_fr(end)}
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1, mb: 3 }}>
                    <Button
                        size="small"
                        onClick={() => handleDetails() }
                        variant='outlined'
                        color='inherit'
                        startIcon={<Iconify icon="fontisto:zoom" />}
                        sx={{ flexShrink: 0 }}
                    >
                        Voir détails
                    </Button>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
                    <div>
                        <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                            Inscrits
                        </Typography>
                        <Typography variant="subtitle1">{fShortenNumber(sessionUsers?.length || 0)}</Typography>
                    </div>

                    <div>
                        <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                            places
                        </Typography>

                        <Typography variant="subtitle1">{fShortenNumber(placeAvailable)}</Typography>
                    </div>

                    <div>
                        <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                            <Button
                                size="small"
                                onClick={() => {
                                    handleOpenConfirmValidation();
                                    handleClosePopoverValidation();
                                }}
                                variant={validation ? 'text' : 'outlined'}
                                color={validation ? 'primary' : 'inherit'}
                                startIcon={validation && <Iconify icon="eva:checkmark-fill" />}
                                sx={{ flexShrink: 0 }}
                            >
                                {validation ? 'Validée' : 'Valider'}
                            </Button>
                        </Typography>

                    </div>
                </Box>
            </Card>


            <ConfirmDialog
                open={openConfirmValidation}
                onClose={handleCloseConfirmValidation}
                content= {
                    <>
                        <Stack
                            spacing={2}
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ sm: 'center' }}
                        >
                            <Stack direction="row" spacing={0}>
                                <Iconify icon='material-symbols:info' width={72} sx= {{ color: '#00B8D9'}} />
                            </Stack>
                            <Stack direction="column" spacing={0}>
                                <Typography><strong>{session.validation ? `Souhaitez-vous invalider la session` : `Souhaitez-vous valider la session`} </strong></Typography>
                            </Stack>
                        </Stack>
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            setOpenConfirmValidation(false);
                            onValidate(session_id, institut_id,validation );
                        }}
                    >
                        {session.validation ? `Invalider la session` : `Valider la session`}
                    </Button>

                }
            />

        </>
    );
}
