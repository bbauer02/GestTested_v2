import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../../utils/cssStyles';

// components
import Image from '../../../../components/image';
import { CustomAvatar } from '../../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    '&:before': {
        ...bgBlur({
            color: theme.palette.primary.dark,
        }),
        top: 0,
        zIndex: 9,
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
}));

const StyledInfo = styled('div')(({ theme }) => ({
    left: 0,
    right: 0,
    zIndex: 99,
    position: 'absolute',
    marginTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
        right: 'auto',
        display: 'flex',
        alignItems: 'center',
        left: theme.spacing(3),
        bottom: theme.spacing(3),
    },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
    institut: PropTypes.object,
};

export default function ProfileCover({ institut }) {

    return (
        <StyledRoot>
            <StyledInfo>
                <CustomAvatar
                    src={institut?.photoURL || ""}
                    alt={institut?.displayName || ""}
                    name={institut?.displayName || ""}
                    sx={{
                        mx: 'auto',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'common.white',
                        width: { xs: 80, md: 128 },
                        height: { xs: 80, md: 128 },
                    }}
                />

                <Box
                    sx={{
                        ml: { md: 3 },
                        mt: { xs: 1, md: 0 },
                        color: 'common.white',
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    <Typography variant="h4">{institut?.label || ""}</Typography>

                    <Typography sx={{ opacity: 0.72 }}>{institut?.city} - {institut?.institutCountry?.label} </Typography>
                </Box>
            </StyledInfo>

            <Image
                alt="cover"
                src=""
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                }}
            />
        </StyledRoot>
    );
}
