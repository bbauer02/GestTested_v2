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

DossierCandidatPDF.propTypes = {
    invoice: PropTypes.object,
    curSession: PropTypes.object,
    curUser: PropTypes.object,

};
export default function DossierCandidatPDF({ invoice, curSession, curUser }) {

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
                        <Typography variant="h4" align="center">DOSSIER D&apos;INSCRIPTION</Typography>
                        <Typography variant="h5" align="center">{test}{level? `-${level}`:""}</Typography>
                        <Typography variant="h6" align="center">Dossier N° {ref_invoice.replace("F", "D")}</Typography>
                        <Typography variant="h4" align="center"> &nbsp;</Typography>
                        <Typography align="right" variant="body1">{`${Institut.city}, le ${fDateTime_fr(new Date(), "dd/MM/yyyy")}`}</Typography>
                    </Grid>

                </Grid>

                <Typography variant="body1">
                    {getCivility(curUser.gender)} {curUser.lastname.toUpperCase()} {curUser.firstname},<br /><br />
                    Le {fDateTime_fr(createDate, "dd/MM/yyyy")}, vous avez procédé à votre inscription à un test {test}{level? `-${level}`:""}, et nous vous en remercions. Vous trouverez ci-dessous votre dossier d’inscription à cette épreuve.
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
                                            Test:
                                        </TableCell>
                                        <TableCell align="left"                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}>
                                            <strong>{test}{level? `-${level}`:""}</strong>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="left"                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}>
                                            Date de la session:
                                        </TableCell>
                                        <TableCell align="left"                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}>
                                            <strong>{fDateTime_fr(curSession.start, "dd/MM/YYY")}</strong>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }} align="left">
                                            Heure de la convocation:
                                        </TableCell>
                                        <TableCell                                                    sx={{
                                            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }} align="left">
                                            <strong>{fDateTime_fr(curSession.start, "HH:mm")}</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
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
                                        <TableCell colSpan={2} ><strong>Vos options pour ce test</strong></TableCell>
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
                                        <TableCell colSpan={2} ><strong>Vos informations personnelles</strong></TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left" width={200}><strong>Nom et prénom:</strong></TableCell>
                                        <TableCell align="left"> {curUser.lastname} {curUser.firstname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ verticalAlign: 'top' }} align="left" ><strong>Adresse:</strong></TableCell>
                                        <TableCell align="left">
                                            <Typography variant="body2" align="left">{curUser.adress1}</Typography>
                                            {curUser.adress2? <Typography align="left" variant="body2">{curUser.adress2}</Typography> : ""}
                                            <Typography align="left" variant="body2">{curUser.zipcode} {curUser.city.toUpperCase()}</Typography>
                                            <Typography align="left" variant="body2">{ curUser.country.label.toUpperCase() }</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left"><strong>Téléphone:</strong></TableCell>
                                        <TableCell align="left"> {curUser.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" ><strong>Adresse email:</strong></TableCell>
                                        <TableCell align="left"> {curUser.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" ><strong>Date de naissance:</strong></TableCell>
                                        <TableCell align="left"> { curUser.birthday? fDateTime_fr(curUser.birthday, "dd/MM/yyyy")  : "N/C" }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" ><strong>Nationalité:</strong></TableCell>
                                        <TableCell align="left"> {curUser.nationality.label.toUpperCase()}</TableCell>
                                    </TableRow>
                                     <TableRow>
                                        <TableCell align="left" ><strong>Langue maternelle:</strong></TableCell>
                                        <TableCell align="left"> {curUser.firstlanguage.nativeName.toUpperCase()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 5 }} />
                <br />
                <br />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            size="small"
                            checked
                        />
                    }
                    label="J&apos;ai pris note que toute absence de ma part à la session commandée ne pourra pas entraîner le remboursement des frais d&apos;inscription."
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            size="small"
                            checked
                        />
                    }
                    label="Je m&apos;engage à me présenter à la session commandée."
                />
                <Divider sx={{ mt: 5 }} />
                <Typography align="center" variant="body2">{Institut.label} - {Institut.adress1} {Institut.adress2} {Institut.zipcode} {Institut.city.toUpperCase()} {Institut.institutCountry.label.toUpperCase()}</Typography>
                <Typography align="center" variant="body2">Tel:{Institut.phone} - Email:{Institut.email}</Typography>
            </Card>

        </>
    );
}
