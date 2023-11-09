import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
    Checkbox,
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
    FormControlLabel,
    FormControl
} from '@mui/material';
// utils
import { fDateTime_fr } from '../../../utils/formatTime';
import {getCivility, getGender} from '../../../utils/formatGenders';
// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
    '& td': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

// ----------------------------------------------------------------------

AttestationInscription.propTypes = {
    invoice: PropTypes.object,
    curSession: PropTypes.object,
    curUser: PropTypes.object,

};
export default function AttestationInscription({ invoice, curSession, curUser }) {

    if (!invoice) {
        return null;
    }
    const {
        Institut,
        status,
        ref_invoice,
        customerFirstname,
        customerLastname,
        customerAddress1,
        customerAddress2,
        customerZipCode,
        customerCity,
        customerCountry,
        customerEmail,
        customerPhone,
        createDate,
        dueDate,
        lines,
        session,
        test,
        level

    } = invoice;


    return (
        <>

            <Card sx={{ pt: 5, px: 5 }}>
                <Grid container>

                    <Grid item xs={12} sm={5} sx={{ mb: 5 }}>
                        <Typography variant="subtitle1">{Institut.label}</Typography>
                        <Typography variant="body2">{Institut.adress1}</Typography>
                        {Institut.adress2 ? <Typography variant="body2">Institut.adress2</Typography> :""}
                        <Typography variant="body2">{Institut.zipcode} {Institut.city.toUpperCase()}</Typography>
                        <Typography variant="body2">{Institut.institutCountry.label.toUpperCase()}</Typography>
                        <Typography variant="body2"><strong>email:</strong> {Institut.email}</Typography>
                        <Typography variant="body2"><strong>Phone:</strong> {Institut.phone}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Typography variant="subtitle1" align="right">{getCivility(curUser.gender)} {curUser.lastname} {curUser.firstname}</Typography>
                        <Typography variant="body2" align="right">{curUser.adress1}</Typography>
                        {curUser.adress2? <Typography align="right" variant="body2">{curUser.adress2}</Typography> : ""}
                        <Typography align="right" variant="body2">{customerZipCode} {curUser.city.toUpperCase()}</Typography>
                        <Typography align="right" variant="body2">{ curUser.country.label.toUpperCase() }</Typography>
                        <Typography align="right" variant="body2">&nbsp;</Typography>
                    </Grid>


                    <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
                        <Typography variant="h4" align="center">ATTESTATION D&apos;INSCRIPTION</Typography>
                        <Typography variant="h5" align="center">{test}{level? `-${level}`:""}</Typography>
                        <Typography variant="h6" align="center">Dossier N° {ref_invoice.replace("F", "D")}</Typography>
                        <Typography variant="h4" align="center"> &nbsp;</Typography>
                        <Typography align="right" variant="body1">{`${Institut.city}, le ${fDateTime_fr(new Date(), "dd/MM/yyyy")}`}</Typography>
                    </Grid>

                </Grid>


                <Typography variant="body1">
                    Nous, centre de passation du {test}{level? `-${level}`:""} par convention avec le C.I.E.P. (centre international d’études pédagogiques), attestons que :
                </Typography>
                <br />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={5}>
                        <TableContainer>
                            <Table sx={{ width: 400 }}>
                                <TableBody>
                                    <TableRow >
                                        <TableCell align="left"
                                                   sx={{
                                                       borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                                       borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                                       borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                                       borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                                   }}
                                        >
                                            Nom et prénom:
                                        </TableCell>
                                        <TableCell align="left"                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}>
                                            <strong>{curUser.lastname.toUpperCase()} {curUser.firstname}</strong>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="left"                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}>
                                            Demeurant:
                                        </TableCell>
                                        <TableCell align="left"                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}>
                                               <Typography variant="body2" align="left"><strong>{curUser.adress1}</strong></Typography>
                                                {curUser.adress2? <Typography align="left" variant="body2"><strong>{curUser.adress2}</strong></Typography> : ""}
                                                <Typography align="left" variant="body2"><strong>{curUser.zipcode} {curUser.city.toUpperCase()}</strong></Typography>
                                                <Typography align="left" variant="body2"><strong>{ curUser.country.label.toUpperCase() }</strong></Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <br />

                <Typography variant="body1">
                    a régulièrement procédé à son inscription aux épreuves du {test}{level? `-${level}`:""} suivants et <strong>en a réglé tous les droits</strong> :
                </Typography>
                <br />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={5}>
                        <TableContainer sx={{ overflow: 'unset' }}>
                            <Table sx={{ minWidth: 400 }} size="small" dense="true">
                                <TableHead
                                    sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': { backgroundColor: 'transparent' },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell colSpan={2} ><strong>Epreuves souscrites pour ce test</strong></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {lines.map((line, index) => (
                                        <TableRow
                                            key={index}
                                        >

                                            <TableCell  width={200} align="left">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            size="small"
                                                            checked
                                                        />
                                                    }
                                                    label={line.label}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Typography variant="body1">
                    Fait pour valoir ce que de droit,
                </Typography>
                <br />
                <br />
                <Divider sx={{ mt: 5 }} />
                <Typography align="center" variant="body2">{Institut.label} - {Institut.adress1} {Institut.adress2} {Institut.zipcode} {Institut.city.toUpperCase()} {Institut.institutCountry.label.toUpperCase()}</Typography>
                <Typography align="center" variant="body2">Tel:{Institut.phone} - Email:{Institut.email}</Typography>
            </Card>

        </>
    );
}
