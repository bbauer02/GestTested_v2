import PropTypes from "prop-types";
import {useEffect, useState} from "react";

// @mui
import {Container, Box, Stack, Typography, Button} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// redux
import {getSessionsByInstitut, putSession} from "../../../../../redux/slices/session";
import { useDispatch, useSelector } from '../../../../../redux/store';

// Component
import SessionCard from "../../../session/card/SessionCard";
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

ProfileSessionsInstitut.propTypes = {
    institut: PropTypes.object,
};
export default function ProfileSessionsInstitut({institut}) {

    const { institut_id } = institut;

    const dispatch = useDispatch();

    const { sessions } = useSelector((state) => state.session);

    useEffect(() => {
        dispatch(getSessionsByInstitut(institut_id));
    }, [dispatch, institut_id]);


    const handleValidateSession = (sessionId, institutId, validation ) => {
        const session = {
            session: {
                validation: !validation,
                institut_id: institutId,
                session_id: sessionId,
            },
            sessionHasExams:null
        }
       dispatch(putSession(institutId, sessionId, session));

    }


    return (
        <>
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
            >
                {sessions.map((session) => (
                    <SessionCard  key={session.session_id} session={session} onValidate={handleValidateSession} />
                ))}
            </Box>
        </>
    );
}