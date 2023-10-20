import PropTypes from "prop-types";
import {useMemo} from "react";
import * as Yup from "yup";

import {Controller, useForm} from "react-hook-form";


import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

// @mui
import {Box, Grid, Card, CardHeader, CardContent, Stack, Typography, TextField} from '@mui/material';
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from '../../../../components/snackbar';

import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../../components/hook-form';

import {PAYMENT_OPTION} from "../../../../utils/formatPayment";





SessionDetailUserDocuments.propTypes = {
    sessionUser : PropTypes.object,
}
export default function SessionDetailUserDocuments({sessionUser}) {
    const { enqueueSnackbar } = useSnackbar();
    const UserGestionSchema = Yup.object().shape({

    });

    const initialValues = useMemo(() => ({

    }), []);

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
            enqueueSnackbar('Update success !');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
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
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                DOCUMENTS
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