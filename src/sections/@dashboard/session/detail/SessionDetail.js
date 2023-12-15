import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    Card,
    Grid,
    Table,
    Divider,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    Typography,
    TableContainer,
    Chip,
    Stack

} from '@mui/material';

import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify';
import SessionExamCollapsibleRow  from "./SessionExamCollapsibleRow";
import SessionDetailBloc from "./SessionDetailBloc";
//
// ----------------------------------------------------------------------


SessionDetail.propTypes = {
    session : PropTypes.object
}
export default function SessionDetail({session=null}) {
    const theme = useTheme();

    if (!session) {
        return null;
    }

    const {
        Institut,
        Level,
        Test,
        validation,
        session_id,
        start,
        end,
        sessionHasExams,
        placeAvailable,
        sessionUsers,
        limitDateSubscribe
    } = session;



    return (
        <>
            <Card sx={{ pt: 2, px: 5}}>
                <Grid container>
                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Typography variant="h4">{Institut?.label}</Typography>
                        <Chip color="primary" variant="fill" label={Test?.label} style={{ fontSize: '13px', fontWeight: 'bold' }}/>

                        { Level?.label ? <Chip color="secondary" variant="fill" label={Level?.label} style={{ fontSize: '13px', fontWeight: 'bold' }}/> : "" }
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>

                        <Box sx={{ textAlign: { sm: 'right' } }}>
                            <Chip
                                variant="fill"
                                icon={<Iconify width={25} icon="mdi:users" />}
                                label={`${sessionUsers.length} / ${placeAvailable}`}
                                color="primary"
                                style={{ fontSize: '13px', fontWeight: 'bold' }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Scrollbar>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                        sx={{ py: 2 }}
                    >
                        <SessionDetailBloc
                            title="Début de session"
                            date={start}
                            icon="eva:clock-fill"
                            color={theme.palette.info.main}
                            percent={100}
                        />
                        <SessionDetailBloc
                            title="Fin de session"
                            date={end}
                            icon="eva:clock-fill"
                            color={theme.palette.success.main}
                            percent={100}
                        />

                        <SessionDetailBloc
                            title="Limite d'inscription"
                            date={limitDateSubscribe}
                            icon="eva:bell-fill"
                            color={theme.palette.error.main}
                            percent={100}
                        />

                    </Stack>
                </Scrollbar>

                <br />

                <TableContainer sx={{ overflow: 'unset' }}>
                    <Scrollbar>
                        <Table >
                            <TableHead
                                sx={{
                                    borderBottom: () => `solid 1px ${theme.palette.divider}`,
                                    '& th': { backgroundColor: 'transparent' },
                                }}
                            >
                                <TableRow>
                                    <TableCell width={40}>#</TableCell>

                                    <TableCell align="left">Epreuve, Salle, Adresse</TableCell>

                                    <TableCell align="left">Date de l&apos;épreuve</TableCell>

                                    <TableCell align="center">Oral/Ecrit</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sessionHasExams.map((row, index) => (
                                    <SessionExamCollapsibleRow key={index} row={row} isUserOptions={false}/>
                                ))}

                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Divider sx={{ mt: 5 }} />
            </Card>
        </>
    )
}