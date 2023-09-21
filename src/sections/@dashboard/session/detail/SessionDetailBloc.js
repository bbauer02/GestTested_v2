import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';

// components
import Iconify from '../../../../components/iconify';
// utils
import {fDateTime_fr} from '../../../../utils/formatTime';

SessionDetailBloc.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    percent: PropTypes.number
}
export default function SessionDetailBloc({icon, color, title, date, percent}) {

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: 1, minWidth: 200 }}
        >
            <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
                <Iconify icon={icon} width={24} sx={{ color, position: 'absolute' }} />
                <CircularProgress
                    variant="determinate"
                    value={percent}
                    size={56}
                    thickness={4}
                    sx={{ color, opacity: 0.48 }}
                />

                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={56}
                    thickness={4}
                    sx={{
                        top: 0,
                        left: 0,
                        opacity: 0.48,
                        position: 'absolute',
                        color: (theme) => alpha(theme.palette.grey[500], 0.16),
                    }}
                />
            </Stack>

            <Stack spacing={0.5} sx={{ ml: 2 }}>
                <Typography variant="h6">{title}</Typography>

                <Typography variant="subtitle2"  sx={{ color }}>
                    {fDateTime_fr(date)}{' '}
                </Typography>

            </Stack>

        </Stack>

    );
}