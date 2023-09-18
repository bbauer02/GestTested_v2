import PropTypes from 'prop-types';
// @mui
import { Link, Card, CardHeader, Stack } from '@mui/material';
// _mock
import { _socials } from '../../../../../_mock/arrays';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

ProfileSocialInfo.propTypes = {
  socialLinks: PropTypes.object,
};

export default function ProfileSocialInfo({ socialLinks = { facebook: "", instagram:"", linkedin:"", twitter: ""} }) {


  const { facebook, instagram, linkedin, twitter } = socialLinks;

  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack key={link.name} direction="row" sx={{ wordBreak: 'break-all' }}>
            <Iconify
              icon={link.icon}
              sx={{
                mr: 2,
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link component="span" variant="body2" color="text.primary">
              {(link.value === 'facebook' && facebook) ||
                (link.value === 'instagram' && instagram) ||
                (link.value === 'linkedin' && linkedin) ||
                  twitter}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
