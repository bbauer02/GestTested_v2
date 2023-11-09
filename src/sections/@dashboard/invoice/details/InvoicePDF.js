/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
    invoice: PropTypes.object,
};

export default function InvoicePDF({ invoice }) {
    const {
        ref_invoice,
        status,
        Institut,
        customerFirstname,
        customerLastname,
        customerPhone,
        customerAddress1,
        customerAddress2,
        customerCity,
        customerCountry,
        customerEmail,
        customerZipCode,
        createDate,
        dueDate,
        session,
        lines,
        test,
        level

    } = invoice;

    const calculateTTC = (price, taxe) => price + price * taxe/100;
    const totalHT = lines.reduce((acc, _line) => acc + _line.price_HT, 0 );
    const totalTTC = lines.reduce( (acc, _line) => acc + calculateTTC(_line.price_HT, _line.tva), 0);


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <Image source="/logo/logo_full.png" style={{ height: 32 }} />
                    <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                        <Text style={styles.h3}>{
                            (status === 1 && `Payé`) ||
                            (status === 2 && `Retard de paiement`) ||
                            (status === 0 && `Non payé`) ||
                            `Brouillon`
                        }</Text>
                        <Text> {`Facture: ${ref_invoice}`} </Text>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>

                        <Text style={[styles.overline, styles.mb8]}>Facture de:</Text>
                        <Text style={styles.body1}>{Institut.label}</Text>
                        <Text style={styles.body1}>{Institut.address1}</Text>
                        {Institut.address2 && <Text style={styles.body1}>{Institut.address2}</Text>}
                        <Text style={styles.body1}>{Institut.zipcode} {Institut.city.toUpperCase()}</Text>
                        <Text style={styles.body1}>{Institut.institutCountry.label.toUpperCase()}</Text>
                        <Text style={styles.body1}>{Institut.phone}</Text>
                        <Text style={styles.body1}>{Institut.email}</Text>

                    </View>
                    <View style={styles.col6}>
                        <Text style={[styles.overline, styles.mb8]}>Facture pour:</Text>
                        <Text style={styles.body1}>{customerLastname} {customerFirstname}</Text>
                        <Text style={styles.body1}>{customerAddress1}</Text>
                        {customerAddress2 && <Text style={styles.body1}>{customerAddress2}</Text>}
                        <Text style={styles.body1}>{customerZipCode} {customerCity.toUpperCase()}</Text>
                        <Text style={styles.body1}>{customerCountry.toUpperCase()}</Text>
                        <Text style={styles.body1}>{customerPhone}</Text>
                        <Text style={styles.body1}>{customerEmail}</Text>

                    </View>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        <Text style={[styles.overline, styles.mb8]}>Date de création</Text>
                        <Text style={styles.body1}>{fDate(createDate)}</Text>
                    </View>
                    <View style={styles.col6}>
                        <Text style={[styles.overline, styles.mb8]}>Date de limite de paiement</Text>
                        <Text style={styles.body1}>{fDate(dueDate)}</Text>
                    </View>
                </View>

                <Text style={[styles.overline, styles.mb8]}>Détail de votre inscription à la  {session} pour le {test}{level? `-${level}`:""}   </Text>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell_1}>
                                <Text style={styles.subtitle2}>#</Text>
                            </View>

                            <View style={styles.tableCell_2}>
                                <Text style={styles.subtitle2}>Description</Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>Prix HT</Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>TVA</Text>
                            </View>

                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text style={styles.subtitle2}>Total</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.tableBody}>
                        {lines.map((_line, index) => (
                            <View style={styles.tableRow} key={index+1}>
                                <View style={styles.tableCell_1}>
                                    <Text>{index + 1}</Text>
                                </View>

                                <View style={styles.tableCell_2}>
                                    <Text style={styles.subtitle2}>[{`${test}${level? `- ${level}` : ""}] || ${_line.label}` }</Text>
                                    <Text> {`${session}`} {_line.test} {_line.level? `- ${_line.level}` : ""}</Text>
                                </View>

                                <View style={styles.tableCell_3}>
                                    <Text>{_line.price_HT}</Text>
                                </View>

                                <View style={styles.tableCell_3}>
                                    <Text>{_line.tva}</Text>
                                </View>

                                <View style={[styles.tableCell_3, styles.alignRight]}>
                                    <Text>{fCurrency(calculateTTC(_line.price_HT,_line.tva ))}</Text>
                                </View>
                            </View>
                        ))}

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>Total HT</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{fCurrency(totalHT)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>TVA</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{ fCurrency(totalTTC - totalHT)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text style={styles.h4}>Total</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text style={styles.h4}>{fCurrency(totalTTC)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
