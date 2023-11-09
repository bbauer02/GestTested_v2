import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  power: PropTypes.number
};

export default function RoleBasedGuard({ power, children }) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  let currentRole = 0;
  // const currentRole = 'user';
    if(user?.instituts && user?.instituts.length > 0 ) {
        currentRole = user?.instituts[0].Role;
    }
    else {
        currentRole = user.systemRole;
    }

  if( power === undefined || currentRole.power < power ) { 

    return ( 
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    );
  }


  return <> {children} </>;
}
