import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfileSessionsUsersInfo from './ProfileSessionsUsersInfo';
import ProfileSocialInfo from './ProfileSocialInfo';
import ProfileLastSessions from "./ProfileLastSessions";
// ----------------------------------------------------------------------

Profile.propTypes = {
    institut: PropTypes.object,
};

export default function Profile({ institut }) {


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>

          <ProfileSessionsUsersInfo sessions={institut?.nbrSessions} subscribers={institut?.nbrUsers} />

          <ProfileAbout
            address1={institut?.adress1}
            address2={institut?.adress2}
            zipcode={institut?.zipcode}
            city={institut?.city}
            phone={institut?.phone}
            siteweb={institut?.siteweb}
            country={institut?.institutCountry?.label}
            email={institut?.email}

          />

          <ProfileSocialInfo socialLinks={institut?.socialNetwork} />

        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
         <ProfileLastSessions />
        </Stack>
      </Grid>
    </Grid>
  );
}
