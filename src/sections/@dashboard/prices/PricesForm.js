import React,{useEffect} from "react";
import {useSnackbar} from "notistack";
import PropTypes from "prop-types";
import {Stack, Box, Button, Typography, InputAdornment, Card} from '@mui/material';
import {useForm} from "react-hook-form";
import FormProvider, {RHFTextField} from "../../../components/hook-form";
import Iconify from "../../../components/iconify";
import {useDispatch, useSelector} from "../../../redux/store";
import {postExamPrice, putExamPrice} from '../../../redux/slices/price';




PricesForm.propTypes = {
    examPrice: PropTypes.object,
    institut: PropTypes.number
}
export default function PricesForm({examPrice, institut}) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const {exam_id} = examPrice;


    const defaultValues = {
        price : examPrice.InstitutHasPrices.length > 0 ? String(examPrice.InstitutHasPrices[0].price) : "0",
        tva : examPrice.InstitutHasPrices.length > 0 ? String(examPrice.InstitutHasPrices[0].tva) : "0"
    };
    const methods = useForm({
        defaultValues,
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = methods;

    useEffect(() => {
       setValue("price", examPrice.InstitutHasPrices.length > 0 ? +examPrice.InstitutHasPrices[0].price : "0");
       setValue("tva", examPrice.InstitutHasPrices.length > 0 ? +examPrice.InstitutHasPrices[0].tva : "0");

    },[examPrice, setValue])

    const onSubmit = async (data) => {
        if(examPrice.InstitutHasPrices.length > 0) {
            // Update putExamPrice
            enqueueSnackbar('Prix modifié', { variant: 'success' });
            dispatch(putExamPrice(institut,exam_id, data ));
        }
        else {
            enqueueSnackbar('Prix ajouté', { variant: 'success' });
            dispatch(postExamPrice(institut,exam_id, data ));
        }

    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card  sx={{ marginTop: 5}}>
                    <Stack spacing={3}>
                        <Typography variant="h5">{examPrice.label}</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                            <RHFTextField
                                type="number"
                                name="price"
                                label="Prix H.T."
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }}
                                sx={{ maxWidth: { md: 150 } }}
                            />
                            <RHFTextField
                                type="number"
                                name="tva"
                                label="TVA"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                sx={{ maxWidth: { md: 150 } }}
                            />
                            <Button variant="contained" color="primary" size="large" type="submit">
                                <Iconify icon='material-symbols:save' /> Enregistrer
                            </Button>
                        </Stack>
                    </Stack>
                </Card>

        </FormProvider>
    );
}