import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
    '& td': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
    invoice: PropTypes.object,
};
export default function InvoiceDetails({ invoice }) {
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

    const calculateTTC = (price, taxe) => price + price * taxe/100;
    const totalHT = lines.reduce((acc, _line) => acc + _line.price_HT, 0 );
    const totalTTC = lines.reduce( (acc, _line) => acc + calculateTTC(_line.price_HT, _line.tva), 0);

    return (
        <>
            <InvoiceToolbar invoice={invoice} />

            <Card sx={{ pt: 5, px: 5 }}>
                <Grid container>
                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Image disabledEffect alt="logo" src="/logo/logo_full.png" sx={{ maxWidth: 200 }} />
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Box sx={{ textAlign: { sm: 'right' } }}>
                            <Label
                                variant="soft"
                                color={
                                    (status === 1 && 'success') ||
                                    (status === 2 && 'warning') ||
                                    (status === 0 && 'error') ||
                                    'default'
                                }
                                sx={{ textTransform: 'uppercase', mb: 1 }}
                            >
                                {
                                    (status === 1 && `Payé`) ||
                                    (status === 2 && `Retard de paiement`) ||
                                    (status === 0 && `Non payé`) ||
                                    `Brouillon`
                                }
                            </Label>

                            <Typography variant="h6">Facture : {ref_invoice}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                            Facture de:
                        </Typography>

                        <Typography variant="body2">{Institut.label}</Typography>

                        <Typography variant="body2">{Institut.adress1}</Typography>
                        {Institut.adress2 ? <Typography variant="body2">Institut.adress2</Typography> :""}
                        <Typography variant="body2">{Institut.zipcode} {Institut.city.toUpperCase()}</Typography>
                        <Typography variant="body2">{Institut.institutCountry.label.toUpperCase()}</Typography>
                        <Typography variant="body2"><strong>email:</strong> {Institut.email}</Typography>
                        <Typography variant="body2"><strong>Phone:</strong> {Institut.phone}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                            Facture pour:
                        </Typography>

                        <Typography variant="body2">{customerLastname} {customerFirstname}</Typography>

                        <Typography variant="body2">{customerAddress1}</Typography>
                        {customerAddress2? <Typography variant="body2">customerAddress2</Typography> : ""}
                        <Typography variant="body2">{customerZipCode} {customerCity.toUpperCase()}</Typography>
                        <Typography variant="body2">{ customerCountry.toUpperCase() }</Typography>
                        <Typography variant="body2"><strong>email:</strong> {customerEmail}</Typography>
                        <Typography variant="body2"><strong>Phone:</strong> {customerPhone}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                            Date de création
                        </Typography>

                        <Typography variant="body2">{fDate(createDate)}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                            Date limite de paiement
                        </Typography>

                        <Typography variant="body2">{fDate(dueDate)}</Typography>
                    </Grid>
                </Grid>
                <br />
                <Typography variant="h6">Détail de votre inscription à la  {session} pour le {test}{level? `-${level}`:""}</Typography>
                <br /><br />
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Scrollbar>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead
                                sx={{
                                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                    '& th': { backgroundColor: 'transparent' },
                                }}
                            >
                                <TableRow>
                                    <TableCell width={40}>#</TableCell>

                                    <TableCell align="left">Description</TableCell>

                                    <TableCell align="left">Prix HT</TableCell>

                                    <TableCell align="right">TVA</TableCell>

                                    <TableCell align="right">Prix TTC</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {lines.map((line, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>

                                        <TableCell align="left">
                                            <Box sx={{ maxWidth: 560 }}>
                                                <Typography variant="subtitle2">[{`${test}${level? `- ${level}` : ""}] || ${line.label}` }</Typography>

                                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                    {`${session}`} {line.test} {line.level? `- ${line.level}` : ""}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="left">{fCurrency(line.price_HT)}</TableCell>

                                        <TableCell align="right">{`${line.tva}%`}</TableCell>

                                        <TableCell align="right">{fCurrency(calculateTTC(line.price_HT,line.tva ))}</TableCell>
                                    </TableRow>
                                ))}

                                <StyledRowResult>
                                    <TableCell colSpan={3} />

                                    <TableCell align="right" sx={{ typography: 'body1' }}>
                                        <Box sx={{ mt: 2 }} />
                                        Total HT
                                    </TableCell>

                                    <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                                        <Box sx={{ mt: 2 }} />
                                        {fCurrency(totalHT)}
                                    </TableCell>
                                </StyledRowResult>

                                <StyledRowResult>
                                    <TableCell colSpan={3} />

                                    <TableCell align="right" sx={{ typography: 'body1' }}>
                                        TVA
                                    </TableCell>

                                    <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                                        { fCurrency(totalTTC - totalHT)}
                                    </TableCell>
                                </StyledRowResult>

                                <StyledRowResult>
                                    <TableCell colSpan={3} />

                                    <TableCell align="right" sx={{ typography: 'h6' }}>
                                        Total
                                    </TableCell>

                                    <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                                        {fCurrency(totalTTC)}
                                    </TableCell>
                                </StyledRowResult>
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Divider sx={{ mt: 5 }} />

            </Card>
        </>
    );
}
