import PropTypes from "prop-types";

import {useMemo, useEffect} from "react";
import * as Yup from "yup";

import {Controller, useForm} from "react-hook-form";


import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

// @mui
import {Box, Grid, Card, CardHeader, CardContent, Stack, Typography, TextField} from '@mui/material';
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '../../../../components/snackbar';

// redux
import { useDispatch } from '../../../../redux/store';
import {updateSessionUsers} from '../../../../redux/slices/session';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';

import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../../components/hook-form';

import {PAYMENT_OPTION} from "../../../../utils/formatPayment";





SessionDetailUserGestion.propTypes = {
    sessionUser : PropTypes.object,
}
export default function SessionDetailUserGestion({sessionUser}) {
    const dispatch = useDispatch();
    const { user } = useAuthContext();
    const institut_id = user.instituts[0].institut_id;
    const { enqueueSnackbar } = useSnackbar();
    const UserGestionSchema = Yup.object().shape({

    });

    const initialValues = useMemo(() => ({
        hasPaid: sessionUser.hasPaid || false,
        paymentMode: sessionUser.paymentMode || '',
        inscription: sessionUser.inscription || '',
        numInscrAnt: sessionUser.numInscrAnt || '',
        informations: sessionUser.informations || '',
        sessionUser_id: sessionUser.sessionUser_id || '',

    }), [sessionUser]);

    const methods = useForm({
        resolver: yupResolver(UserGestionSchema),
        defaultValues: initialValues,
    });
    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
        reset,
        control
    } = methods;

    const onSubmit = async (data, e) => {
        try {
            dispatch(updateSessionUsers(institut_id, sessionUser.session_id, sessionUser.user_id, data));
            enqueueSnackbar('Mise à jour des informations!');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
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
                    <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                        <LoadingButton
                            size="large"
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Enregistrer les modifications
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>
    );
}