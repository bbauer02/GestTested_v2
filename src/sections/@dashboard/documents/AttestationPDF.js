/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';


// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
//
import styles from './pdfStyle';

AttestationPDF.propTypes = {
    data: PropTypes.object,
};

export default function AttestationPDF({ data = null }) {


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        <Text style={[styles.overline, styles.mb8]}>Attestation d&lsquo;inscription</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )

}