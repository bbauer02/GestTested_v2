// @mui
import { styled } from '@mui/material/styles';
import {Typography, Box, Grid, Card, CardHeader, CardContent, Stack, Table, TableContainer, TableCell, TableBody, TableHead, TableRow} from "@mui/material";
import {useFormContext} from "react-hook-form";
// Redux
import { useSelector } from "react-redux";
import { getCivility, getGender} from "../../../../utils/formatGenders";
import { getPaymentMethod, getPaymentIcon, CalculPrixTTC } from "../../../../utils/formatPayment";
import {RHFSelect, RHFSwitch, RHFUploadAvatar} from "../../../../components/hook-form";
import {fData, fCurrency} from "../../../../utils/formatNumber";
import Iconify from "../../../../components/iconify";
import {fDateTime_fr} from '../../../../utils/formatTime';


const StyledRowResult = styled(TableRow)(({ theme }) => ({
    '& td': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

    },
}));

const StyledIcon = styled(Iconify)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
}));

export default function SessionAddUserStep4() {
    const {
        watch
    } = useFormContext();

    const { countries } = useSelector((state) => state.country);
    const { languages } = useSelector((state) => state.language);
    const values = watch();
    const country = countries.filter(_country =>_country.country_id ===values.country_id)[0];
    const language = languages.filter(_language =>_language.firstlanguage_id ===values.firstlanguage_id)[0];
    const nationality = countries.filter(_country =>_country.country_id ===values.nationality_id)[0];




    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                        <RHFUploadAvatar
                            disabled
                            name="avatar"
                            maxSize={3145728}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />

                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <CardHeader  title="Civilités"  style={{ paddingTop: "0px" }} />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6}>
                                        <Stack direction="row">
                                            <StyledIcon icon="mdi:address-marker" />
                                            <Typography variant="body1">
                                                { getCivility(values.civility) } {values.lastname} {values.firstname}
                                                <br />
                                                {values.adress1}
                                                {values.adress2 && (
                                                    <>
                                                        <br />
                                                        {values.adress2}
                                                    </>
                                                )}
                                                <br />
                                                {values.zipcode} {values.city}
                                                <br />
                                                {country?.label.toUpperCase()}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row">
                                            <StyledIcon icon="eva:email-fill" />
                                            <Typography variant="body1">{values.email}</Typography>
                                        </Stack>
                                        <Stack direction="row">
                                            <StyledIcon icon="iconamoon:phone-fill" />

                                            <Typography variant="body1">
                                                {values.phone}
                                            </Typography>
                                        </Stack>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle1"> Nationalité: </Typography>
                                    <Stack direction="row">
                                        <Typography variant="body1">
                                            {nationality?.countryLanguage}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="subtitle1"> Langue maternelle: </Typography>
                                    <Stack direction="row">
                                        <Typography variant="body1">
                                            {language?.name}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="subtitle1" color="primary"> Identifiant: </Typography>
                                    <Stack direction="row">
                                        <Typography variant="body1">
                                            {values.login}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card sx={{ p: 3, marginTop:"10px"}}>
                        <CardHeader  title="Informations diverses"  style={{ paddingTop: "0px" }} />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row">
                                        <StyledIcon icon={values.hasPaid ? "streamline:interface-validation-check-square-1-check-form-validation-checkmark-success-add-addition-box-square" : "mdi:cancel-box-outline"} />
                                        <Typography variant="body1">
                                            {values.hasPaid ? "Paiement complet" : "Paiement non effectué"}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row">
                                        <StyledIcon icon={getPaymentIcon(+values.paymentMode)} />
                                        <Typography variant="body1">
                                            {getPaymentMethod(values.paymentMode)}
                                        </Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row">
                                        <StyledIcon icon="tabler:number" />
                                        <Typography variant="body1">
                                            {values.numInscrAnt? values.numInscrAnt : "Aucun ancien numéro" }
                                        </Typography>
                                    </Stack>
                                    <Typography variant="subtitle1"> Commentaire: </Typography>
                                    <Stack direction="row">
                                        <StyledIcon icon="mdi:information" />
                                        <Typography variant="body1">
                                            {values.informations}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                    <Card sx={{ p: 3, marginTop:"10px"}}>
                        <CardHeader  title="Options et tarifs appliqués au candidat"  style={{ paddingTop: "0px" }} />
                        <CardContent>
                            <TableContainer sx={{ overflow: 'unset' }}>
                                <Table >
                                    <TableHead
                                        sx={{
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                            '& th': { backgroundColor: 'transparent' },
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell align="left">Epreuve</TableCell>

                                            <TableCell align="center">Prix HT</TableCell>

                                            <TableCell align="center">TVA</TableCell>

                                            <TableCell align="center">Prix TTC</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            values.userExams.map((_exam, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box sx={{ maxWidth: 560 }}>
                                                            <Typography variant="subtitle2">{_exam.exam} du {fDateTime_fr(_exam.datetime,"dd/MM/yyyy à HH:mm")}</Typography>

                                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                                {_exam.adressExam}
                                                            </Typography>

                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center">{fCurrency(_exam.user_price)} </TableCell>
                                                    <TableCell align="center">{_exam.tva_user? _exam.tva_user : 22} %</TableCell>
                                                    <TableCell align="center">{fCurrency(CalculPrixTTC(_exam.user_price, _exam.tva_user))}</TableCell>
                                                </TableRow>
                                            ))
                                        }

                                        <StyledRowResult>
                                            <TableCell colSpan={2} />
                                            <TableCell align="right" sx={{ typography: 'caption' }}>
                                                <Box sx={{ mt: 2 }} />
                                                Total HT
                                            </TableCell>

                                            <TableCell align="left"  sx={{ typography: 'subtitle2' }}>
                                                <Box sx={{ mt: 2 }} />
                                                {fCurrency(values.userExams.reduce((total, _exam) => total + _exam.user_price ,0))}
                                            </TableCell>
                                        </StyledRowResult>
                                        <StyledRowResult>
                                            <TableCell colSpan={2} />
                                            <TableCell align="right" sx={{ typography: 'caption' }}>
                                                <Box sx={{ mt: 2 }} />
                                                Total TTC
                                            </TableCell>

                                            <TableCell align="left"  sx={{ typography: 'subtitle2' }}>
                                                <Box sx={{ mt: 2 }} />
                                                {fCurrency(values.userExams.reduce((total, _exam) => total + CalculPrixTTC(_exam.user_price,_exam.tva ) ,0))}
                                            </TableCell>
                                        </StyledRowResult>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>


            </Grid>
        </>
    )
}