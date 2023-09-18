import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  zipcode: PropTypes.string,
  city: PropTypes.string,
  phone: PropTypes.string,
  siteweb: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
};

export default function ProfileAbout({ address1, address2, zipcode, city, phone, siteweb, country, email }) {
  return (
    <Card>
      <CardHeader title="A propos" />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            {address1}  {address2 ==="" ?  "" :   <><br />{address2}</> } <br /> {zipcode} {city} <br /> {country}
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="mdi:internet" />

          <Typography variant="body2">

            <Link component="span" variant="subtitle2" color="text.primary">
              {siteweb}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="iconamoon:phone-fill" />

          <Typography variant="body2">
              {phone}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
