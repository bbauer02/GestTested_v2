import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// Mui
import { Box, Card, Button, Avatar, Typography, Stack, IconButton,Tooltip } from '@mui/material';

// @mui
import { useTheme } from '@mui/material/styles';

// components
import Iconify from '../../../../components/iconify';

import ConfirmDialog from '../../../../components/confirm-dialog';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// utils
import {fDateTime_fr} from '../../../../utils/formatTime';



SessionDetailUsers.propTypes = {
    session : PropTypes.object
}
export default function SessionDetailUsers({session=null}) {
    const navigate = useNavigate();

    const theme = useTheme();


    const handleSessionUserDetail = (session_id, user_id, tab=null) => {
        navigate(PATH_DASHBOARD.session.user(session_id, user_id, tab));
    }

    return (
        <>
      <Typography variant="h6" sx={{ my: 5 }}>
        Candidats de la session  du <span style={{color: theme.palette.primary.main }}>{fDateTime_fr(session?.start, 'MM/dd/yyyy')}</span> au <span style={{color: theme.palette.primary.main }}>{fDateTime_fr(session?.end, 'MM/dd/yyyy')}</span>
      </Typography>
      
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {session?.sessionUsers.map((candidat) => (
        <Card
        key={candidat.user_id}
            sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
            }}
            >
            <Avatar alt={`${candidat.User.lastname} ${candidat.User.firstname}`} src={candidat.User.avatar} sx={{ width: 48, height: 48 }} />
        
            <Box
                sx={{
                pl: 2,
                pr: 1,
                flexGrow: 1,
                minWidth: 0,
                }}
            >
                <Typography variant="subtitle2" noWrap>
                {`${candidat.User.lastname} ${candidat.User.firstname}`}
                </Typography>
        
                <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
                    <Iconify icon="eva:pin-fill" width={16} sx={{ flexShrink: 0 }} />

                    <Typography variant="body2" component="span" noWrap>
                        {candidat.User.country.label}
                    </Typography>
                </Stack>
                <Stack  spacing={0} direction="row" alignItems="left" sx={{ color: 'text.secondary' }}>
                    <Tooltip title="Voir détails">
                        <IconButton color='primary' onClick={() => handleSessionUserDetail(session.session_id,candidat.user_id)}>
                            <Iconify icon="mdi:account-details" />
                        </IconButton>
                    </Tooltip>
                    {
                        candidat.informations &&  candidat.informations !=="" &&
                        <Tooltip title={candidat.informations}>
                            <IconButton color='secondary' onClick={() => handleSessionUserDetail(session.session_id,candidat.user_id, 'gestion')}>
                                <Iconify icon="mdi:information" />
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title="Désinscrire un candidat">
                        <span>
                            <IconButton color='error' onClick={() => console.log("Quitter la session")} disabled>
                                <Iconify icon="pepicons-pop:leave" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
                
            </Box>
            <Button
                size="small"
                variant={candidat.hasPaid ? 'text' : 'outlined'}
                color={candidat.hasPaid  ? 'primary' : 'warning'}
                startIcon={candidat.hasPaid  && <Iconify icon="mdi:currency-eur" />}
                sx={{ flexShrink: 0 }}
            >
                {candidat.hasPaid  ? 'Payé' : 'Non payé'}
            </Button>

        </Card>

        ))}
      </Box>
    </>
    );
}