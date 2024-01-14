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


Convocation.propTypes = {
    invoice: PropTypes.object,
    curSession: PropTypes.object,
    curUser: PropTypes.object,
};

export default function Convocation({ invoice, curSession, curUser }) {

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
                        <Typography variant="h4" align="center">CONVOCATION</Typography>
                        <Typography variant="h5" align="center">{test}{level? `-${level}`:""}</Typography>
                        <Typography variant="h6" align="center">Dossier N° {ref_invoice.replace("F", "D")}</Typography>
                        <Typography variant="h4" align="center"> &nbsp;</Typography>
                        <Typography align="right" variant="body1">{`${Institut.city}, le ${fDateTime_fr(new Date(), "dd/MM/yyyy")}`}</Typography>
                    </Grid>

                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
                        <Typography variant="h6" align="center" sx={{ color: "red", border: "2px solid red", padding: 2 }}>
                            VEUILLEZ LIRE TOUTE LA CONVOCATION : Veuillez vous munir d’une pièce d’identité  VALIDE et d’un stylo à  ENCRE NOIRE ,  Présentez-vous 30 minutes avant l’heure de début de l’épreuve.Prévoyez 3 heures d’examen.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
                        <Typography variant="subtitle1" align="left">{getCivility(curUser.gender)} {curUser.lastname} {curUser.firstname},</Typography>
                        <Typography variant="subtitle1" align="left">J&apos;ai l&apos;honneur de vous inviter à vous présenter à la session du test <strong>{test}{level? `-${level}`:""}</strong>,</Typography>
                            <TableContainer>
                                <Table >
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
                                                <strong>Epreuve</strong>
                                            </TableCell>
                                            <TableCell align="left"                                                    sx={{
                                                borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                                borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                            }}>
                                                <strong>Date et heure</strong>
                                            </TableCell>
                                            <TableCell align="left"                                                    sx={{
                                                borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                                borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                                borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                            }}>
                                                <strong>Adresse</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </Grid>
                </Grid>






                <Divider sx={{ mt: 5 }} />
                <Typography align="center" variant="body2">{Institut.label} - {Institut.adress1} {Institut.adress2} {Institut.zipcode} {Institut.city.toUpperCase()} {Institut.institutCountry.label.toUpperCase()}</Typography>
                <Typography align="center" variant="body2">Tel:{Institut.phone} - Email:{Institut.email}</Typography>
            </Card>

        </>
    );
}