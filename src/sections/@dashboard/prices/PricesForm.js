import React,{useEffect} from "react";
import PropTypes from "prop-types";
import {Stack, Box, Button} from '@mui/material';
import {useForm} from "react-hook-form";
import FormProvider, {RHFTextField} from "../../../components/hook-form";
import Iconify from "../../../components/iconify";
import {useDispatch, useSelector} from "../../../redux/store";
import {postExamPrice} from '../../../redux/slices/price';




PricesForm.propTypes = {
    examPrice: PropTypes.object,
    institut: PropTypes.number
}
export default function PricesForm({examPrice, institut}) {
    const dispatch = useDispatch();
    const {exam_id} = examPrice;

    console.log(examPrice.label, examPrice.InstitutHasPrices[0]?.price);

    const defaultValues = {
        price : examPrice.InstitutHasPrices.length > 0 ? examPrice.InstitutHasPrices[0].price : "0",
        tva : examPrice.InstitutHasPrices.length > 0 ? examPrice.InstitutHasPrices[0].tva : "0"
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
            // Update
            console.log("UPDATE",exam_id, institut)
        }
        else {
            // Insert
            console.log("INSERT",exam_id, institut)
            dispatch(postExamPrice(institut,exam_id, data ));
            console.log(data);
        }

    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 3, maxWidth: 400 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                    <RHFTextField name="price" label={examPrice.label}   />
                    <RHFTextField name="tva" label="tva"  />
                    <Box sx={{ pt: 0.4 }}>
                        <Stack spacing={1} direction="row">
                            <Button variant="contained" color="primary" size="large" type="submit">
                                <Iconify icon='material-symbols:save' /> Enregistrer
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormProvider>
    );
}