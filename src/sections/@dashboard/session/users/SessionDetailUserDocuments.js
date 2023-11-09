import PropTypes from "prop-types";
import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
// @mui
import { useTheme } from '@mui/material/styles';
import {Box, Grid, Card, CardHeader, CardContent, Dialog, DialogContent, useMediaQuery, DialogTitle } from '@mui/material';
// Redux
import { useSelector } from "react-redux";

import FileCard from   '../../file/FileCard';


//
import InvoiceDetails from '../../invoice/details';
import DossierCandidatPDF from "../../documents/DossierCandidatPDF";
import AttestationInscription from "../../documents/AttestationInscription";
import Convocation from "../../documents/Convocation";
import AttestationPresence from "../../documents/AttestationPresence";

export default function SessionDetailUserDocuments() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);

    // Logic here to get current user role
    const { invoice } = useSelector((state) => state.invoice);
    const { session, sessionUser } = useSelector((state) => state.session);

    const [document, setDocument] = useState('')

    const handleSelectDocument = (_document) => {
        setDocument(_document);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
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
                                    <FileCard filename="Facture" docType="facture"  onSelect={handleSelectDocument} />
                                    <FileCard filename="Dossier Candidat" docType="dossier" onSelect={handleSelectDocument} />
                                    <FileCard filename="Attestation d'inscription" docType="attestation"  onSelect={handleSelectDocument} />
                                    <FileCard filename="Convocation" docType="convocation"  onSelect={handleSelectDocument} />
                                    <FileCard filename="Attestation de présence" docType="presence"  onSelect={handleSelectDocument} />
                                    <FileCard filename="Envoi des attestations" docType="invoice"  onSelect={handleSelectDocument} />

                                </Box>
                            </CardContent>
                        </Card>
                        <br />
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            scroll="paper"
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            fullScreen={fullScreen}
                            maxWidth="md"
                        >
                            <DialogTitle id="scroll-dialog-title">
                                {document === "facture" && "Facture"}
                                {document === "dossier" && "Dossier d'inscription du candidat"}
                                {document === "attestation" && "Attestation d'inscription du candidat"}
                                {document === "convocation" && "Convocation du candidat"}
                                {document === "presence" && "Attestation de présence du candidat"}



                            </DialogTitle>
                            <DialogContent dividers>
                                {document === "facture" && <InvoiceDetails invoice={invoice}/>}
                                {document === "dossier" && <DossierCandidatPDF curUser={sessionUser.sessionUsers[0].User} curSession={session} invoice={invoice}/>}
                                {document === "attestation" && <AttestationInscription curUser={sessionUser.sessionUsers[0].User} curSession={session} invoice={invoice}/>}
                                {document === "convocation" && <Convocation curUser={sessionUser.sessionUsers[0].User} curSession={session} invoice={invoice}/>}
                                {document === "presence" && <AttestationPresence curUser={sessionUser.sessionUsers[0].User} curSession={session} invoice={invoice}/>}

                            </DialogContent>
                        </Dialog>
                    </Grid>
                </Grid>
            </>
    );
}

// ----------------------------------------------------------------------

