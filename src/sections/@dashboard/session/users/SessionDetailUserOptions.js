import sum from 'lodash/sum';
import PropTypes from "prop-types";
import { useSnackbar } from 'notistack';
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
import { useDispatch, useSelector} from '../../../../redux/store';
import { getExamsDetailsOfSession} from '../../../../redux/slices/exam';
import {addUserOption, deleteUserOption, updateUserOption} from '../../../../redux/slices/session';

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
    SessionDetail : PropTypes.object,
}
export default function SessionDetailUserOptions({SessionDetail}) {
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const dispatch = useDispatch();

    const { user } = useAuthContext();
    const { session_id, user_id } = useParams();
    const institut_id = user.instituts[0].institut_id;

    const [ userOptions, setUserOptions ] = useState([]);
    const [EXAMS_OPTION, setEXAMSOPTION] = useState([]);
    const [loadingSend, setLoadingSend] = useState(false);

    const { exams, isLoading } = useSelector((state) => state.exam);




    // On récupére la liste complete de tout les exams
   useEffect(() => {
            dispatch(getExamsDetailsOfSession(  institut_id,session_id ));
    }, [institut_id, session_id, dispatch])


   useEffect(() => {
     const OptFormated = [];


        // Prix de base ou prix personnalisé
       SessionDetail?.sessionHasExams?.forEach(option => {


       // const hasOption =  SessionDetail?.sessionUsers[0].sessionUserOptions.filter(option = option.exam_id === option.Exam.exam_id);

        const curExamOpt = SessionDetail?.sessionUsers[0].sessionUserOptions.filter((opt) => opt.exam_id === option.Exam.exam_id);

        let price_base = null;
        let tva_base = null;
        let datetime = null;
        let addressExam = null;
        let option_id = null;

        if(curExamOpt && curExamOpt.length > 0) {
            price_base = curExamOpt[0].user_price;
            tva_base = curExamOpt[0].tva;
            datetime =  curExamOpt[0].DateTime;
            addressExam = curExamOpt[0].addressExam;
            option_id = curExamOpt[0].option_id;
        }
        else {
            price_base = option.Exam.InstitutHasPrices && option.Exam.InstitutHasPrices.length > 0 ? option.Exam.InstitutHasPrices[0].price : option.Exam.price;
            tva_base = option.Exam.InstitutHasPrices && option.Exam.InstitutHasPrices.length > 0 ? option.Exam.InstitutHasPrices[0].tva : 22;
            datetime = option.DateTime;
            addressExam = option.adressExam;
        }

        const price_user = price_base;
        const tva_user = tva_base;



        OptFormated.push({
            option_id,
            exam_id: option.Exam.exam_id,
            exam: option.Exam.label,
            datetime,
            addressExam,
            price_base,
            tva_base,
            price_user,
            tva_user,
            price_ttc:0,
            isOption: false,
            price_user_ttc: calculTTC( Number(price_user), Number(tva_user) )
        })

       })

       // Ajout maintenant des OPTIONS

       const optsUser = SessionDetail?.sessionUsers[0].sessionUserOptions.filter( obj1 => !OptFormated.some( obj2 => obj2.option_id === obj1.option_id));

       optsUser?.forEach(opt => {
           const labelExam = exams?.find(exam=> exam.exam_id === opt.exam_id)?.Exam?.label || "Exam Label";
           OptFormated.push({
               option_id :opt.option_id,
               exam_id : opt.exam_id,
               exam :  labelExam,
               datetime : opt.DateTime,
               addressExam : opt.addressExam,
               price_user: opt.user_price,
               tva_user : opt.tva,
               price_ttc:0,
               isOption: true,
               price_user_ttc: calculTTC( Number(opt.user_price), Number(opt.tva) )
           });
       })

       setUserOptions(OptFormated)

       setEXAMSOPTION(exams.filter(exam => !SessionDetail?.sessionHasExams.some(sessionExam => (sessionExam.Exam.exam_id === exam.exam_id)))
                           .filter(exam => !OptFormated.some(opt => opt.exam_id === exam.exam_id)))

    }, [SessionDetail, exams, setUserOptions]);


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

    const onSubmit =  (data) => {
        setLoadingSend(true);
        // Algorithme pour ajouter les options dans la table UserHasOptions
        // Exam OBLIGATOIRE : => On ne fait rien de spécial SAUF si : 
        // DateTime , AddressExam, Price et TVA sont différent de ceux de base
        // Dans ce cas on ajoute une ligne dans la table UserHasOptions avec les valeurs modifiées

        // Exam OPTIONNEL : => On ajoute obligatoirement une ligne dans la table UserHasOptions avec les valeurs de base ou modifiées

        /* Cas des OPTIONS OBLIGATOIRES */
        data.items.forEach( async (item) => {
            const sessionUser_id = SessionDetail?.sessionUsers[0].sessionUser_id;
            // institut_id
            // cas des sessions obligatoires
            /// On récupére le OPTION_ID s'il existe. Si il est null , nous faisons un insert, sinon un update
            const sessionExam = SessionDetail?.sessionHasExams.filter( (exam) => exam.Exam.exam_id === item.exam_id )[0];
            const price_base = sessionExam?.Exam?.InstitutHasPrices && sessionExam?.Exam?.InstitutHasPrices?.length > 0 ? sessionExam?.Exam?.InstitutHasPrices[0].price: sessionExam?.Exam?.price;
            const tva_base = sessionExam?.InstitutHasPrices && sessionExam?.InstitutHasPrices?.length > 0 ? sessionExam?.InstitutHasPrices[0].tva : 22;
            const date_base = sessionExam?.DateTime;
            const adressExam = sessionExam?.adressExam;

            const newOption = {
                user_price : item.price_user,
                tva: item.tva_user,
                addressExam: item.addressExam,
                isCandidate: null,
                DateTime: item.datetime,
                sessionUser_id,
                exam_id: item.exam_id,
                session_id: SessionDetail.session_id,

            };


            if(!item.isOption) {
                // on vérifie si le prix !== le prix de base
                if(!item.option_id && (item.price_user !== price_base || item.tva_user !== tva_base || item.addressExam !== adressExam || item.datetime !== date_base) ) {
                    // On ajoute alors l'épreuve dans la table UseOption
                    dispatch(addUserOption(institut_id, newOption));
                    enqueueSnackbar(`Ajout de l'option ${item.exam}`);

                }
                else if( item.option_id && (item.price_user !== price_base || item.tva_user !== tva_base || item.addressExam !== adressExam || item.datetime !== date_base) ) {
                   dispatch(updateUserOption(institut_id, sessionUser_id, item.exam_id, item.option_id, newOption ))
                    enqueueSnackbar(`Mise à jour de l'option ${item.exam}`);
                }
            }
            else if (item.option_id) {

                    dispatch(updateUserOption(institut_id, sessionUser_id, item.exam_id, item.option_id, newOption ));
                    enqueueSnackbar(`Mise à jour de l'option ${item.exam}`);

            }
            else {
            dispatch(addUserOption(institut_id, newOption));
            enqueueSnackbar(`Ajout de l'option ${item.exam}`);
        }



        });
    };

    const handleRemove = (index, exam_id) => {
        const ExamToRemove = exams.filter(exam => exam.exam_id === exam_id);
        setEXAMSOPTION([...EXAMS_OPTION, ExamToRemove[0] ]);
        const OptionToRemove = values.items.filter(value => value.exam_id === exam_id);
        const optionId = OptionToRemove[0].option_id;
        const examId = OptionToRemove[0].exam_id;
        const sessionUser_id = SessionDetail?.sessionUsers[0].sessionUser_id;
        if(OptionToRemove[0].option_id) {
            dispatch(deleteUserOption(institut_id, sessionUser_id, examId, optionId ))
        }
        remove(index);
        enqueueSnackbar(`Suppresion de l'option ${ExamToRemove[0].Exam?.label}`);
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