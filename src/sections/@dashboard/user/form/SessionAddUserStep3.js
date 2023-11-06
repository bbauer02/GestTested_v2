import PropTypes from "prop-types";

import {useMemo, useEffect} from "react";
import * as Yup from "yup";

import {Controller, useForm, useFormContext} from "react-hook-form";


import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

// @mui
import {Box, Grid, Card, CardHeader, CardContent, Stack, Typography, TextField} from '@mui/material';
import {LoadingButton} from "@mui/lab";
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {RHFSelect, RHFSwitch, RHFTextField} from "../../../../components/hook-form";
import {PAYMENT_OPTION} from "../../../../utils/formatPayment";


export default function SessionAddUserStep3() {
    const {
        control,
        setValue,
        formState: { isSubmitting },
        watch,
        onSubmit
    } = useFormContext();


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <CardHeader  title="Informations de gestion" />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                <RHFSwitch name="hasPaid" label="Paiement complet" />
                                <RHFSelect native name="paymentMode" label="Mode de paiement" placeholder="Mode de paiement" >
                                    <option key={-1} value={-1}>Choisir un moyen de paiement</option>
                                    {Object.entries(PAYMENT_OPTION).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </RHFSelect>
                            </Box>
                            <Box
                                sx={{
                                    paddingTop:5,
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                }}
                            >
                                <Controller
                                    name="inscription"
                                    control={control}
                                    render={({ field }) => (
                                        <MobileDateTimePicker
                                            {...field}
                                            onChange={(newValue) => field.onChange(newValue)}
                                            label="Date d'inscription"
                                            inputFormat="dd/MM/yyyy hh:mm a"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    )}

                                />

                                <RHFTextField
                                    size="small"
                                    name="numInscrAnt"
                                    label="Numéro d'inscription antérieur"
                                    InputLabelProps={{ shrink: true }}
                                />

                                <RHFTextField
                                    size="small"
                                    name="informations"
                                    label="Informations importantes"
                                    InputLabelProps={{ shrink: true }}
                                    multiline rows={5}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}