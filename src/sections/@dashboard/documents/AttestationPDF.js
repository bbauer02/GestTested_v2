/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';


// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';

AttestationPDF.propTypes = {
    data: PropTypes.object,
};

export default function AttestationPDF({ data = null }) {


    return (
        <>
            AttestationPDF
        </>
    )

}