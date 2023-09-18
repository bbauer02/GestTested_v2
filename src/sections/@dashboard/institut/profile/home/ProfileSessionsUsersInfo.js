import PropTypes from 'prop-types';
// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProfileSessionsUsersInfo.propTypes = {
  subscribers: PropTypes.number,
  sessions: PropTypes.number,
};

export default function ProfileSessionsUsersInfo({ subscribers, sessions }) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(subscribers)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Inscrits
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(sessions)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Sessions organisées
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
