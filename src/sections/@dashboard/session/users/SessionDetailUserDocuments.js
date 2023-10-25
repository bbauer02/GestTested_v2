import PropTypes from "prop-types";
// @mui
import {Box, Grid, Card, CardHeader, CardContent} from '@mui/material';

import FileCard from   '../../file/FileCard';
import InvoicePDF from '../../documents/InvoicePDF';
import AttestationPDF from "../../documents/AttestationPDF";
import AttestationPresencePDF from "../../documents/AttestationPresence";
import ConvocationPDF from "../../documents/ConvocationPDF";
import DossierCandidatPDF from "../../documents/DossierCandidatPDF";
import EnvoiAttestationPDF from "../../documents/EnvoiAttestationPDF";




SessionDetailUserDocuments.propTypes = {
    session : PropTypes.object,
}
export default function SessionDetailUserDocuments({session}) {
console.log(session)

    return (
        <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <CardHeader  title="Documents du candidat" />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                }}
                            >
                                <FileCard filename="Facture" document={<InvoicePDF invoice={{name: "BAUER BAPTISTE"}} />}/>
                                <FileCard filename="Dossier Candidat" document={<DossierCandidatPDF />} />
                                <FileCard filename="Attestation d'inscription"  document={<AttestationPDF />}  />
                                <FileCard filename="Convocation"  document={<ConvocationPDF />} />
                                <FileCard filename="Attestation de présence"   document={<AttestationPresencePDF />} />
                                <FileCard filename="Envoi des attestations"  document={<EnvoiAttestationPDF />}  />

                            </Box>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
    );
}