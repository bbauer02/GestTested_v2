import sum from 'lodash/sum';
import PropTypes from "prop-types";
import * as Yup from 'yup';
import {useTheme} from "@mui/material/styles";
import {useCallback, useEffect,useState, useMemo} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useParams } from "react-router-dom";

// form
import {useFormContext, useFieldArray, useForm, Controller} from 'react-hook-form';
import {Table, TableBody, TableCell, TableContainer, TableHead, MenuItem, Box, Typography, Stack, Divider, InputAdornment, TextField, Card, Button} from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// redux
import {dispatch, useDispatch, useSelector} from '../../../../redux/store';
import { getExamsDetailsOfSession} from '../../../../redux/slices/exam';

// auth
import { useAuthContext } from '../../../../auth/useAuthContext';

// components
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';

import calculTTC from '../../../../utils/tools';


SessionDetailUserOptions.propTypes = {
    sessionUser : PropTypes.object,
}
export default function SessionDetailUserOptions({sessionUser}) {
    const theme = useTheme();

    const { user } = useAuthContext();
    const { session_id, user_id } = useParams();
    const institut_id = user.instituts[0].institut_id;

    const [ userOptions, setUserOptions ] = useState([]);
    const [EXAMS_OPTION, setEXAMSOPTION] = useState([]);
    const [loadingSend, setLoadingSend] = useState(false);

    const { exams, isLoading } = useSelector((state) => state.exam);

    const { sessionHasExams : examsBase } = sessionUser;


    // On récupére la liste complete de tout les exams
   useEffect(() => {
            dispatch(getExamsDetailsOfSession(  institut_id,session_id ));
    }, [institut_id, session_id])


   useEffect(() => {
     const OptFormated = [];


        // Prix de base ou prix personnalisé
        sessionUser?.sessionHasExams?.forEach(option => {
        const price_base = option.InstitutHasPrices && option.InstitutHasPrices.length > 0 ? option.InstitutHasPrices[0].price : option.Exam.price;
        const tva_base = option.InstitutHasPrices && option.InstitutHasPrices.length > 0 ? option.InstitutHasPrices[0].tva : 22;

        const price_user = price_base;
        const tva_user = tva_base;
        setEXAMSOPTION(exams.filter(exam => !sessionUser?.sessionHasExams.some(sessionExam => sessionExam.Exam.exam_id === exam.exam_id) ))


        OptFormated.push({
            option_id: null,
            exam_id: option.Exam.exam_id,
            exam: option.Exam.label,
            datetime: option.DateTime,
            addressExam: option.adressExam,
            price_base,
            tva_base,
            price_user,
            tva_user,
            price_ttc:0,
            isOption: false,
            price_user_ttc: calculTTC( Number(price_user), Number(tva_user) )
        })

       })


       setUserOptions(OptFormated)
    }, [sessionUser, exams, setUserOptions]);


    const OptionsSchema = Yup.object().shape({
    });

    const initialValues = useMemo(
        () => (
            {
                selNewExam: '-1',
                items: userOptions || [
                    { option_id:0,exam_id:0,  exam: "", datetime: new Date(), addressExam:'', price_user:0, tva_user:0, price_ttc:0, tva_base:0, price_base:0, isOption: false, price_user_ttc: 0},
                ]
            }),
            [userOptions]
        );

    const handleAdd = () => {
        if(values.selNewExam === '-1') return;
        const selectedExam = exams.filter(exam => exam.exam_id === Number(values.selNewExam))[0];
        // Prix de base ou prix personnalisé
        const price_base = selectedExam.Exam.InstitutHasPrices && selectedExam.Exam.InstitutHasPrices.length > 0 ? selectedExam.Exam.InstitutHasPrices[0].price : selectedExam.Exam.price;
        const tva_base = selectedExam.Exam.InstitutHasPrices && selectedExam.Exam.InstitutHasPrices.length > 0? selectedExam.Exam.InstitutHasPrices[0].tva : 22;

        const userOption = {

            option_id: null,
            exam_id: selectedExam.Exam.exam_id,
            exam: selectedExam.Exam.label,
            datetime: selectedExam.DateTime,
            addressExam: selectedExam.adressExam,
            price_user: price_base,
            price_base,
            tva_user: tva_base,
            tva_base,
            
            isOption: true,
            price_user_ttc:calculTTC( Number(price_base), Number(tva_base) )
        }


        append(userOption); 
        
        setEXAMSOPTION(EXAMS_OPTION.filter(exam => exam.exam_id !== Number(selectedExam.exam_id)));
        setValue('selNewExam', '-1');

    };

    const methods = useForm({
        resolver: yupResolver(OptionsSchema),
        initialValues,
    });
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        control,
        watch,
        resetField

    } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    const values = watch();

    useEffect(() => {
        if(userOptions) {
            reset(initialValues)
        }
    }, [reset, userOptions, initialValues]);

    const onSubmit = async (data) => {
        setLoadingSend(true);
        console.log(data.items)
        console.log(sessionUser)
        // Algorithme pour ajouter les options dans la table UserHasOptions
        // Exam OBLIGATOIRE : => On ne fait rien de spécial SAUF si : 
        // DateTime , AddressExam, Price et TVA sont différent de ceux de base
        // Dans ce cas on ajoute une ligne dans la table UserHasOptions avec les valeurs modifiées

        // Exam OPTIONNEL : => On ajoute obligatoirement une ligne dans la table UserHasOptions avec les valeurs de base ou modifiées

        sessionUser.sessionHasExams.forEach( async (option) => {
            // cas des sessions obligatoires
            /// On récupére le OPTION_ID s'il existe. Si il est null , nous faisons un insert, sinon un update



        });
    };

    const handleRemove = (index, exam_id) => {
        const ExamToRemove = exams.filter(exam => exam.exam_id === exam_id);
        setEXAMSOPTION([...EXAMS_OPTION, ExamToRemove[0] ]);
        remove(index);





    };


    const userPricesHT = values?.items?.map( (item) => Number(item.price_user));
    const userPriceTax = values?.items?.map( (item) => calculTTC(Number(item.price_user), Number(item.tva_user)) );

    const handleChangePrice = useCallback(
        (event, index) => {
            setValue(`items[${index}].price_user`, Number(event.target.value));
            setValue(
                `items[${index}].price_user_ttc`,
                values.items.map((item) =>    calculTTC(Number(item.price_user), Number(item.tva_user)) )[index]
            );
        },
        [setValue, values.items]
    );

    const handleChangeTVA = useCallback(
        (event, index) => {
            setValue(`items[${index}].tva_user`, Number(event.target.value));
            setValue(
                `items[${index}].price_user_ttc`,
                values.items.map((item) =>    calculTTC(Number(item.price_user), Number(item.tva_user)) )[index]
            );
        },
        [setValue, values.items]
    );



    return (
        <>
            <Card>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: 'text.disabled' }}>
                            Epreuves et Options du candidat :
                        </Typography>

                        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>

                            { fields.map((option, index) => (
                            <Stack key={index} alignItems="flex-end" spacing={1.5}>
                              <Stack  direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1,  }}>

                                  <RHFTextField
                                      size="small"
                                      name={`items[${index}].exam`}
                                      label="Epreuve"
                                      InputLabelProps={{ shrink: true }}
                                      sx={{ maxWidth: { md: 180 } }}
                                      disabled
                                  />

                                    <Controller
                                        name={`items[${index}].datetime`}
                                        control={control}
                                        render={({ field }) => (
                                            <MobileDateTimePicker
                                                {...field}
                                                onChange={(newValue) => field.onChange(newValue)}
                                                label="Start date"
                                                inputFormat="dd/MM/yyyy hh:mm a"
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        )}

                                    />

                                    <RHFTextField
                                        size="small"
                                        name={`items[${index}].addressExam`}
                                        label="Adresse de l'épreuve"
                                        InputLabelProps={{ shrink: true }}
                                        multiline rows={3}
                                    />

                                    <RHFTextField
                                        size="small"
                                        type="number"
                                        name={`items[${index}].price_user`}
                                        label="Prix HT"
                                        onChange={(event) => handleChangePrice(event, index)}
                                        placeholder="0"
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                        sx={{ maxWidth: { md: 80 } }}
                                    />

                                     <RHFTextField
                                        size="small"
                                        type="number"
                                        name={`items[${index}].tva_user`}
                                        min={0}
                                        label="TVA"
                                        onChange={(event) => handleChangeTVA(event, index)}
                                        placeholder="0"
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                            inputProps: { min: 0, max: 100 },
                                        }}
                                        sx={{ maxWidth: { md: 80 } }}
                                    />

                                    <RHFTextField
                                        size="small"
                                        type="number"
                                        disabled
                                        name={`items[${index}].price_user_ttc`}
                                        placeholder="0"
                                        label="Prix TTC"
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                        sx={{ maxWidth: { md: 105 } }}
                                    />

                                  {
                                      option.isOption ?
                                          <Button
                                              size="small"
                                              color="error"
                                              startIcon={<Iconify icon="eva:trash-2-outline" />}
                                              onClick={ () => handleRemove(index,option.exam_id )   }
                                          >
                                              Remove
                                          </Button>
                                          :
                                          ""
                                  }

                                </Stack>
                            </Stack>
                            ))}
                        </Stack>

                        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                        <Stack
                            spacing={2}
                            direction={{ xs: 'column-reverse', md: 'row' }}
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                        >

                            { EXAMS_OPTION.length > 0 &&
                            <>
                                <RHFSelect
                                    name="selNewExam"
                                    size="small"
                                    label="Epreuve à ajouter"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ maxWidth: { md: 250 } }}
                                >
                                    <MenuItem value={-1} selected> Sélectionner une épreuve</MenuItem>

                                    {EXAMS_OPTION.map((exam) => (
                                        <MenuItem
                                            key={exam.Exam.exam_id}
                                            value={exam.Exam.exam_id}
                                        >
                                            {exam.Exam.label}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>

                                <Button
                                    size="small"
                                    startIcon={<Iconify icon="eva:plus-fill" />}
                                    onClick={handleAdd}
                                    sx={{ flexShrink: 0 }}
                                >
                                    Ajouter une épreuve optionnelle au candidat
                                </Button>
                            </>
                        }
                        </Stack>
                        <Stack spacing={2} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="flex-end">
                                <Typography>Total tarif candidat HT :</Typography>
                                <Typography sx={{ textAlign: 'right', width: 120 }}>
                                    {fCurrency(sum(userPricesHT)) || '-'}
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="flex-end">
                                <Typography variant="h6">Total price :</Typography>
                                <Typography variant="h6" sx={{ textAlign: 'right', width: 120 }}>
                                    {fCurrency(sum(userPriceTax)) || '-'}
                                </Typography>
                            </Stack>
                        </Stack>

                    </Box>

                </FormProvider>

            </Card>
            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                <LoadingButton
                    size="large"
                    variant="contained"
                    loading={loadingSend && isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                >
                   Mettre à jour les options
                </LoadingButton>
            </Stack>
        </>
    )

}

// mme messager
// service urnanisme
//